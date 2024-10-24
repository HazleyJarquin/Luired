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
    doc.setFontSize(22);
    doc.text("Factura", 10, 20);
    doc.setFontSize(12);
    doc.text("Productos:", 10, 35);
    doc.setLineWidth(0.5);
    doc.line(10, 37, 200, 37);

    const margin = 10;
    const productWidth = 90;
    let yPosition = 45;

    // Generar el PDF con productos
    const promises: Promise<void>[] = products.map(async (item, index) => {
      const imgData = await getBase64Image(item.image);
      const column = index % 2;
      const xPosition = 10 + column * (productWidth + margin);

      doc.addImage(imgData, "JPEG", xPosition, yPosition, 30, 30);
      doc.text(`Producto: ${item.name}`, xPosition + 40, yPosition + 10);
      doc.text(`Cantidad: ${item.quantity}`, xPosition + 40, yPosition + 20);
      doc.text(
        `Precio: $${item.price.toFixed(2)}`,
        xPosition + 40,
        yPosition + 30
      );

      doc.setLineWidth(0.5);
      doc.line(10, yPosition + 35, 200, yPosition + 35);

      yPosition += index % 2 === 1 ? 40 : 0;
    });

    await Promise.all(promises);

    doc.setFontSize(16);
    doc.text(`Total a pagar: $${totalToPay.toFixed(2)}`, 10, yPosition + 10);
    doc.setLineWidth(0.5);
    doc.line(10, yPosition + 15, 200, yPosition + 15);

    // Convertir el PDF a blob
    const pdfBlob = doc.output("blob");

    // Subir el PDF a Firebase Storage
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `facturas/factura-${user?.displayName}-${Date.now()}.pdf`
    );
    await uploadBytes(storageRef, pdfBlob);

    // Obtener el URL de descarga
    const downloadURL = await getDownloadURL(storageRef);

    // Enviar el enlace de la factura a WhatsApp
    sendToWhatsApp(
      import.meta.env.VITE_WHATSAPP_NUMBER,
      `Hola! me gustaría comprar estos productos🛒. Te dejo acá mi factura✅: ${downloadURL}`
    );
  };

  const getBase64Image = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
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
