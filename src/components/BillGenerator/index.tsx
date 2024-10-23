import { Button } from "@mui/material";
import { jsPDF } from "jspdf";

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
  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Factura", 10, 20);
    doc.setFontSize(12);
    doc.text("Productos:", 10, 35);
    doc.setLineWidth(0.5);
    doc.line(10, 37, 200, 37);

    const margin = 10; // Margen
    const productWidth = 90; // Ancho de cada producto

    let yPosition = 45; // Posición inicial

    const promises: Promise<void>[] = products.map(async (item, index) => {
      const imgData = await getBase64Image(item.image);
      const column = index % 2; // Determinar la columna (0 o 1)
      const xPosition = 10 + column * (productWidth + margin); // Calcular posición X

      // Agregar la imagen del producto
      doc.addImage(imgData, "JPEG", xPosition, yPosition, 30, 30); // Ajustar tamaño de la imagen
      doc.text(`Producto: ${item.name}`, xPosition + 40, yPosition + 10);
      doc.text(`Cantidad: ${item.quantity}`, xPosition + 40, yPosition + 20);
      doc.text(
        `Precio: $${item.price.toFixed(2)}`,
        xPosition + 40,
        yPosition + 30
      );

      // Línea de separación para cada producto
      doc.setLineWidth(0.5);
      doc.line(10, yPosition + 35, 200, yPosition + 35); // Línea de separación

      // Calcular la posición Y para el siguiente producto
      yPosition += index % 2 === 1 ? 40 : 0; // Solo avanzar si es el segundo producto en la fila
    });

    await Promise.all(promises);

    // Añadir el total a pagar
    doc.setFontSize(16);
    doc.text(`Total a pagar: $${totalToPay.toFixed(2)}`, 10, yPosition + 10);
    doc.setLineWidth(0.5);
    doc.line(10, yPosition + 15, 200, yPosition + 15); // Línea final

    // Descargar el PDF
    doc.save("factura.pdf");

    // Enviar mensaje de WhatsApp (opcional)
    sendToWhatsApp("+50575312307", "Aquí está su factura.");
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
