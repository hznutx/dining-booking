'use client'

import { Pagination, Table } from '@heroui/react'
import { useMemo, useState } from 'react'

interface IColumns {
  id: string
  name: string
}

interface ITableProps {
  columns: IColumns[]
  tableData?: any[]
}

const ROWS_PER_PAGE = 10

export const TableDataList: React.FC<ITableProps> = ({
  columns,
  tableData = [],
}) => {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(tableData.length / ROWS_PER_PAGE)

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE

    return tableData.slice(start, start + ROWS_PER_PAGE)
  }, [page, tableData])

  const start = (page - 1) * ROWS_PER_PAGE + 1

  const end = Math.min(page * ROWS_PER_PAGE, tableData.length)

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Table with pagination"
          className="min-w-[600px]"
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column key={column.id} isRowHeader={column.id === 'name'}>
                {column.name}
              </Table.Column>
            )}
          </Table.Header>

          <Table.Body items={paginatedItems}>
            {(item) => (
              <Table.Row key={item.id} id={String(item.id)}>
                <Table.Collection items={columns}>
                  {(column) => (
                    <Table.Cell key={column.id}>{item[column.id]}</Table.Cell>
                  )}
                </Table.Collection>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      <Table.Footer>
        <Pagination size="sm">
          <Pagination.Summary>
            {start} to {end} of {tableData.length} results
          </Pagination.Summary>

          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <Pagination.PreviousIcon />
                Prev
              </Pagination.Previous>
            </Pagination.Item>

            {pages.map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link
                  isActive={p === page}
                  onPress={() => setPage(p)}
                >
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}

            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  )
}
