import { Button } from "@mui/material";
import { jsPDF } from "jspdf";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase imports
import { useUserStore } from "../../store";

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

  const generatePDF = async () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Tienda Luired", 105, 10, { align: "center" });
    doc.text("Factura de Compra", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Cliente: ${user?.displayName}`, 10, 40);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 50);

    const startX = 10;
    const startY = 70;
    const lineHeight = 10;

    doc.setFont("helvetica", "bold");
    doc.text("Producto", startX, startY);
    doc.text("Cantidad", startX + 80, startY);
    doc.text("Precio Unitario", startX + 120, startY);
    doc.text("Total", startX + 160, startY);
    doc.setLineWidth(0.5);
    doc.line(startX, startY + 2, 200, startY + 2);

    let currentY = startY + lineHeight;
    doc.setFont("helvetica", "normal");

    products.forEach((product) => {
      doc.text(product.name, startX, currentY);
      doc.text(`${product.quantity}`, startX + 80, currentY);
      doc.text(`$${product.price.toFixed(2)}`, startX + 120, currentY);
      doc.text(
        `$${(product.price * product.quantity).toFixed(2)}`,
        startX + 160,
        currentY
      );
      currentY += lineHeight;
    });

    doc.setFont("helvetica", "bold");
    doc.text(
      `Total a Pagar: $${totalToPay.toFixed(2)}`,
      startX,
      currentY + lineHeight
    );

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
      `Hola! me gustaría comprar estos productos🛒. Te dejo acá mi factura✅: \n\n${downloadURL}`
    );
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
