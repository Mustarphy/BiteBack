import { jsPDF } from 'jspdf';

export const generateReceipt = (orderData) => {
  const doc = new jsPDF();
  const lineHeight = 10;
  let yPos = 20;

  // Helper function to add text and increment y position
  const addLine = (text, fontSize = 12, isBold = false) => {
    doc.setFontSize(fontSize);
    if (isBold) {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    doc.text(text, 20, yPos);
    yPos += lineHeight;
  };

  // Add header
  addLine('Ponmo Store', 20, true);
  yPos += 10; // Add extra space after header

  // Add order details
  addLine(`Order Receipt #${orderData.id}`, 16, true);
  addLine(`Date: ${new Date(orderData.paidAt).toLocaleDateString()}`);
  yPos += 10;

  // Add customer details
  addLine('Bill To:', 12, true);
  addLine(orderData.shipping.fullName);
  addLine(orderData.shipping.address);
  addLine(`${orderData.shipping.city}, ${orderData.shipping.state}`);
  addLine(`Phone: ${orderData.shipping.phone}`);
  yPos += 10;

  // Add items header
  addLine('Order Items:', 12, true);
  yPos += 5;

  // Add column headers
  doc.setFont('helvetica', 'bold');
  doc.text('Item', 20, yPos);
  doc.text('Qty', 100, yPos);
  doc.text('Price', 130, yPos);
  doc.text('Total', 160, yPos);
  yPos += lineHeight;

  // Add items
  doc.setFont('helvetica', 'normal');
  orderData.items.forEach(item => {
    doc.text(item.name.substring(0, 35), 20, yPos);
    doc.text(item.quantity.toString(), 100, yPos);
    doc.text(`₦${item.price.toFixed(2)}`, 130, yPos);
    doc.text(`₦${(item.price * item.quantity).toFixed(2)}`, 160, yPos);
    yPos += lineHeight;
  });

  // Add total
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount:', 130, yPos);
  doc.text(`₦${orderData.total.toFixed(2)}`, 160, yPos);

  // Add footer
  yPos += 30;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Thank you for your purchase!', 20, yPos);
  yPos += lineHeight;
  doc.text('For any questions, please contact our support.', 20, yPos);

  return doc;
}; 