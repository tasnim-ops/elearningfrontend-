import React from 'react'

const GenericTable = ({ customData, columns, renderActionColumn }) => {
  return (
    <div>
    <table className="table">
      <thead>
        <tr>
          {/* En-têtes de colonne génériques ici */}
          {Object.keys(customData[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {customData.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.field}>{item[column.field]}</td>
            ))}
            {renderActionColumn && (
              <td>{renderActionColumn(item)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default GenericTable