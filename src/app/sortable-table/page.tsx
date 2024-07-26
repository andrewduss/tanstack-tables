'use client'

//
// This file is an expansion of ../basic-table/page.tsx. Comments added where
// this file has been changed from the original.
//

import React, { useEffect, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { zipcodes } from '@/lib/data'
import generateZipcodesData from '@/lib/data'

export type Zipcode = {
  zipcode: string
  created_at: string
  updated_at: string
}

const SortableTablePage = () => {
  const columnHelper = createColumnHelper<Zipcode>()
  // Add 'sortingFn' to each column
  const columns = [
    columnHelper.accessor('zipcode', {
      header: () => "Zipcode",
      cell: info => info.getValue(),
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor('created_at', {
      header: () => "Created At",
      cell: info => new Date(info.getValue()).toLocaleDateString(),
      sortingFn: "datetime",
    }),
    columnHelper.accessor('updated_at', {
      header: () => "Updated At",
      cell: info => new Date(info.getValue()).toLocaleDateString(),
      sortingFn: "datetime",
    }),
  ]

  const [data, setData] = useState(zipcodes)
  // Generate fake data
  useEffect(() => {
    const randomData = generateZipcodesData(25)
    setData(randomData)
  }, [])

  // Create sort state, SortingState is a Tanstack type
  const [sorted, setSorted] = useState<SortingState>([])

  const table = useReactTable({
    data: data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    // Add sorting state set/update abilities to table object
    state: {
      sorting: sorted
    },
    onSortingChange: setSorted,
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <>
      <div>TablePage</div>
      <hr />
      <div className="m-4">
      <table className="w-full text-sm text-center">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                // Add an onClick event to update the `sorted` state that has 
                // been passed into the table object
                  <th scope="col" className="px-6 py-3"
                    key={h.id} 
                    {...{onClick: h.column.getToggleSortingHandler()}}
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                    {/* Add the ascending/descending icons */}
                    {{asc: "🔺", desc: "🔻"}[h.column.getIsSorted() as string] ?? null}
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
      </div>
    </>

  )
}

export default SortableTablePage