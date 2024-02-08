import React from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { Label,Col,Row,Table,Button } from 'reactstrap';

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
        setPageSize, 
        state: { pageSize, globalFilter },
    } = useTable(
        {
            columns:props.columns,
            data: props.items,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useGlobalFilter,
        usePagination
    );

 

    return (
        <>
            <Row>
                <Col>
                <label>Search</label>
                <input
                    value={globalFilter || ''}
                    onChange={e => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
                </Col>
                <Col> 
                <Label>Show</Label>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 15, 20, 25].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                             {pageSize}
                        </option>
                    ))}
                </select>
                <Label>Entries</Label>
                
                </Col>
                
                 
            </Row>
           
            <Table {...getTableProps()} className="table table-hover table-bordered">
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
            </Table>
            <div>
                <Button color="primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </Button>
                <Button color="primary" onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </Button>
            </div>
        </>
    );
}
