'use client'

//
// This file is an expansion of ../basic-table/page.tsx. Comments added where
// this file has been changed from the original.
//

import React, { useEffect, useState } from 'react'

import { 
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'

import generateZipcodesData, { zipcodes } from '@/lib/data'

export type Zipcode = {
  zipcode: string
  created_at: string
  updated_at: string
}

const ColumnFilterableTablePage = () => {
  const columnHelper = createColumnHelper<Zipcode>()
  const columns = [
    columnHelper.accessor('zipcode', {
      header: () => "Zipcode",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('created_at', {
      header: () => "Created At",
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('updated_at', {
      header: () => "Updated At",
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
  ]

  const [data, setData] = useState(zipcodes)
  useEffect(() => {
    const randomData = generateZipcodesData(25)
    setData(randomData)
  }, [])

  const table = useReactTable({
    data: data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    // Add Tanstack filtering to table object
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <>
      <div>TablePage</div>
      <hr />
      <table className="w-full text-sm text-center">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th scope="col" className="px-6 py-3" key={h.id}>
                  {flexRender(h.column.columnDef.header, h.getContext())}
                  {/* Add an input so column is searchable */}
                  <div>
                    <input 
                      type="text"
                      value={(h.column.getFilterValue() || "")  as string}
                      onChange={(e) => h.column.setFilterValue(e.target.value)}
                    />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>

  )
}

export default ColumnFilterableTablePage