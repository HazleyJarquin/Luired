import { Button } from "@mui/material";
import { jsPDF } from "jspdf";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserAddressStore, useUserStore } from "../../store";

interface Products {
  name: string;
  price: number;
  quantity: number;
  id: string;
  image: string;
  stock: number;
  iso3Code: string;
}

interface Props {
  products: Products[];
  totalToPay: number;
}

export const BillGenerator = ({ products, totalToPay }: Props) => {
  const { user } = useUserStore();
  const { address } = useUserAddressStore();

  const generatePDF = async () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Tienda Luired", 105, 20, { align: "center" });
    doc.text("Factura de Compra", 105, 30, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Cliente: ${user?.displayName}`, 10, 50);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 60);
    doc.text(`Dirección: ${address}`, 10, 70);

    const startX = 10;
    let currentY = 80;
    const lineHeight = 40;
    const productImageSize = 25;

    const maxPageHeight = 270;

    const printHeaders = (y: number) => {
      doc.setFont("helvetica", "bold");
      doc.text("Producto", startX, y);
      doc.text("Cantidad", startX + 80, y);
      doc.text("Precio Unitario", startX + 120, y);
      doc.text("Total", startX + 160, y);
      doc.setLineWidth(0.5);
      doc.line(startX, y + 2, 200, y + 2);
    };

    printHeaders(currentY);
    currentY += 10;

    const addProductToPDF = async (product: Products) => {
      const imgData = await getBase64Image(product.image);

      if (currentY + lineHeight > maxPageHeight) {
        doc.addPage();
        currentY = 20;
        printHeaders(currentY);
        currentY += 10;
      }

      doc.addImage(
        imgData,
        "JPEG",
        startX,
        currentY,
        productImageSize * 0.8,
        productImageSize * 0.8
      );

      doc.setFont("helvetica", "normal");
      doc.text(product.name, startX + 25, currentY + 10);
      doc.text(`${product.quantity}`, startX + 90, currentY + 10);
      doc.text(`$${product.price.toFixed(2)}`, startX + 120, currentY + 10);
      doc.text(
        `$${(product.price * product.quantity).toFixed(2)}`,
        startX + 160,
        currentY + 10
      );

      currentY += lineHeight;
    };

    const promises = products.map(addProductToPDF);
    await Promise.all(promises);

    if (currentY + 20 > maxPageHeight) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.text(`Total a Pagar: $${totalToPay.toFixed(2)}`, startX, currentY + 10);

    const pdfBlob = doc.output("blob");
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `facturas/factura-${user?.displayName}-${Date.now()}.pdf`
    );
    await uploadBytes(storageRef, pdfBlob);

    const downloadURL = await getDownloadURL(storageRef);
    sendToWhatsApp(
      import.meta.env.VITE_WHATSAPP_NUMBER,
      `\uD83C\uDF1F ¡Hola! \uD83D\uDC4B Estos son mis productos para comprar: \uD83D\uDECD✨ \n\n ${downloadURL}`
    );
  };

  const getBase64Image = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  const sendToWhatsApp = (phoneNumber: string, message: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Button variant="contained" onClick={generatePDF}>
      Pagar
    </Button>
  );
};
