import React from 'react'
import {
  FilePdfIcon
} from "components/shared/Icons";
import { Colors } from "constants";
import { usePeriodStore } from '../../store/periodStore';
import { getBudgetDetailsByPeriod } from '../../services/budgetDetail';
import { getExpenseByPeriod } from '../../services/expense';
import { currencyFormat } from '../../helpers/currency-format';
import jsPDF from "jspdf";
import "jspdf-autotable"; 

const ExportPdf = () => {
  const {month, year} = usePeriodStore((state) => state.period);

  const onExport = async () => {
    const doc = new jsPDF();

    const budgetDetail = await getBudgetDetailsByPeriod(year, month);
    const expense = await getExpenseByPeriod(year, month);
    
    let data = [];
    for(let budget of budgetDetail) {
      const details = expense.filter(x => x?.detailId == budget?.id);
      for(let detail of details) {
        data.push({
          category: budget.name,
          item: detail.name,
          date: detail.date,
          value: detail.value,
          fullDate: `${detail.date} ${month} ${year}`
        });
      }
    }
    data = data.sort((a, b) => a.date - b.date);

    let total = data.reduce((acc, item) => acc + Number(item.value), 0);
    total = currencyFormat(total);

    const rows = data.map(obj => {
      const amount = currencyFormat(Number(obj.value)).replace('Rp', '');
      return [
        obj.fullDate,
        obj.category,
        obj.item,
        amount
      ]
    });
    doc.text(`Expense ${month} ${year} - ${total}`, 14, 10);
    doc.autoTable({
      head: [['Tanggal', 'Kategori', 'Item', 'Jumlah']],
      body: rows,
      startY: 20,
    });
    doc.save("expense.pdf");
  }

  return (
    <FilePdfIcon size="xl" color={Colors.grey} onClick={onExport} />
  )
}

export default ExportPdf