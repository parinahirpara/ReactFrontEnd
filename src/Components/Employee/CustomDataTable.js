import React from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';

export function CustomDataTable(props) {

   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        prepareRow,
        setGlobalFilter,
        setPageSize, // Add setPageSize here
        state: { pageIndex, pageSize, globalFilter },
    } = useTable(
        {
            columns:props.columns,
            data: props.items,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useGlobalFilter,
        usePagination
    );

 

    return (
        <>
            <div className='row'>
                <div className='col-md-6'>
                <label>Search</label>
                <input
                    value={globalFilter || ''}
                    onChange={e => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
                </div>
                <div className='col-md-6'> 
                Show
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                             {pageSize}
                        </option>
                    ))}
                </select>
                Entry
                </div>
                
                 
            </div>
           
            <table {...getTableProps()} className="table table-hover">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
            </div>
        </>
    );
}
