import Heading from '@/components/Heading'
import DataTable from '@/components/table'

const Cashflow = () => {
    const table = {
        columns: [
          { accessorKey: "category", header: "Category" },
          { accessorKey: "details", header: "Details" },
          { accessorKey: "debit", header: "DR (Debit)" },
          { accessorKey: "credit", header: "CR (Credit)" },
        ],
        data: [
          {
            category: "Opening Balance",
            details: "Cash available at start",
            debit: "Rs 10,000",
            credit: "",
          },
          {
            category: "Cash Inflows",
            details: "Sales (Cash)",
            debit: "",
            credit: "Rs 10,000",
          },
          {
            category: "Cash Inflows",
            details: "Sales (Card/Online Transferred)",
            debit: "",
            credit: "Rs 8,000",
          },
          {
            category: "Cash Inflows",
            details: "Total Inflows",
            debit: "",
            credit: "Rs. 18,000",
          },
          {
            category: "Cash Outflows",
            details: "Purchase of Ingredients",
            debit: "Rs 8,000",
            credit: "",
          },
          {
            category: "Cash Outflows",
            details: "Miscellaneous Expenses",
            debit: "Rs 3,000",
            credit: "",
          },
          {
            category: "Cash Outflows",
            details: "Total Outflows",
            debit: "Rs. 11,000",
            credit: "",
          },
          {
            category: "Closing Balance",
            details: "Cash remaining at end",
            debit: "",
            credit: "Rs. 17,000",
          },
        ],
      };
      


  return (
    <div className='w-full h-full space-y-4'>
        <Heading text="Cashflow" />
        <DataTable
                 columns={table?.columns}
                 data={table?.data}
                 entriesPerPage={10}
                 canSearch={true}
                 download={true}
                 export={true}
                 print={true}
                 filter={true}
                 datePicker={true}
            >
                
            </DataTable>

    </div>
  )
}

export default Cashflow