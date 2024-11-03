import './AddressListItem.css'

export default function AddressListItem({address}) {
  return (
    <table>
      <tr>
        <td
          style={{
            fontSize: "16px",
            textAlign: "center",
          }}
          colSpan={2}
        >
          <b>{address.name}</b> ({address.isVerified? 'подтвержден' : 'не подтвержден' })
        </td>
      </tr>
      <tr
        style={{
          background: "#d3d3d3",
        }}
      >
        <td>
          <b>Наименование пункта</b>
        </td>
        <td>
          <b>Данные</b>
        </td>
      </tr>
      <tr>
        <td>Адрес пункта</td>
        <td>{address.address}</td>
      </tr>
      <tr>
        <td>Ответсвенное лицо</td>
        <td>{address.contactPerson}</td>
      </tr>
      <tr>
        <td>Номер ответсвенного лица</td>
        <td>{address.contactPhone}</td>
      </tr>
      <tr>
        <td>Время работы</td>
        <td>{address.openTime} - {address.closeTime}</td>
      </tr>
    </table>
  );
}
