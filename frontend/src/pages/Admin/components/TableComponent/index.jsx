import { Table } from 'antd'
import React from 'react'

const index = ({
    isLoading, 
    dataSource, 
    columns, 
    pageSize
}) => {
  return (
    <div className="table-wrapper">
        <Table 
        columns={columns ? columns : []}
        dataSource={dataSource ? dataSource: []}
        pagination = {{
            pageSize: pageSize,
            total : dataSource.length,
            showTotal: (total, range) => {
                return range[0] >= total ?
                `1 - ${total}` : `${range[0]} - ${range[1]} trong số ${total} sản phẩm`
            },
            showSizeChanger: false,
            itemRender: (current, type, originalElement) => {
                const lastPage = Math.ceil(dataSource.length / 5) ;
                if (type === 'prev' && current === 0) {
                return originalElement;
                } else if (type === 'prev' && current > 0 && current < lastPage) {
                return originalElement;
                } else {
                return originalElement;
                }
            }
            }}
            scroll={{ x: 400 }}
            components={{
            header: {
                cell: (props) => (
                <th {...props} style={{ ...props.style, position: 'sticky', top: 0 }} />
                )
            }
            }}
        />
    </div>
  )
}

export default index