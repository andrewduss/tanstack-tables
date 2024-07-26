'use client'

import React, { useEffect, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, GlobalFilterTableState, useReactTable } from '@tanstack/react-table'
import generateZipcodesData, { zipcodes } from '@/lib/data'

export type Zipcode = {
  zipcode: string
  created_at: string
  updated_at: string
}

const GlobalFilterableTablePage = () => {
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

  
  // Set global filtering state. `filtering` holds the string of the filter
  const [filtering, setFiltering] = useState<GlobalFilterTableState>()

  const table = useReactTable({
    data: data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    // Add Tanstack filtering to table object. Pass in the global state
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
    state: {
      globalFilter: filtering
    }
  })

  return (
    <>
      <div className="text-center">TablePage</div>
      <hr />
      {/* // Add an input box, bind it to the global `filtering` state */}
      <div className="content-center text-center">
      <input type="text"
        className="text-center mx-8"
        placeholder="Search All Columns"
        value={(filtering || "") as string}
        onChange={(e) => table.setGlobalFilter(e.target.value) }
      />
      </div>
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

export default GlobalFilterableTablePage