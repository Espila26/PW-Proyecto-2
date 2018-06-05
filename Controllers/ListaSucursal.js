const Table = Reactstrap.Table;

class ListaSucursal extends React.Component {
    constructor(props) {
        super(props)
        this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        //this.props.handleReset();
        this.props.handleChangeSucursal(this.props.sucursales[index]);
    }
    render() {
        if (this.props.sucursales.length > 0) {
            const rows = this.props.sucursales.map((sucursal,index) =>
                <tr key={index} data-item={index} onClick={this.handleDetails}>
                <td>{sucursal.id}</td>
                <td>{sucursal.manager_name}</td>
                <td>{sucursal.phone}</td>
                <td>{sucursal.city}</td>
                <td>{sucursal.address}</td></tr>);
        return (
            <Table striped>
                <thead><tr style={{background: "#343a40", color:"white"}}><th>Id</th><th>Admin</th><th>Telefono</th>
                <th>Ciudad</th><th>Direccion</th></tr></thead>
                <tbody>
                {rows}
                </tbody>
            </Table>);
    }
    return (<p>test</p>)
    }
}
