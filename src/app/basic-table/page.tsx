'use client'

import React, { useState } from 'react'
import { createColumnHelper, createTable, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { zipcodes } from '@/lib/data'

// Define row shape
export type Zipcode = {
  zipcode: string
  created_at: string
  updated_at: string
}

const BasicTablePage = () => {
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
  // useEffect(() => {
  //   const url = "http://localhost:3000/api/zipcodes"
  //   fetch(url).then((resp) => resp.json()).then((users) => setData(users) )
  // }, [])

  const table = useReactTable({
    data: data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel()
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

function getColumns() {

  return
}

export default BasicTablePage