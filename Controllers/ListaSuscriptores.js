const Table = Reactstrap.Table;

class ListaSuscriptores extends React.Component {
    constructor(props) {
      super(props)
      this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        //this.props.handleReset();
        this.props.handleChangeSuscriptor(this.props.suscriptores[index]);
    }
    render() {
      if (this.props.suscriptores.length > 0) {
        const rows = this.props.suscriptores.map((suscriptor,index) =>
                    <tr key={index} data-item={index} onClick={this.handleDetails}>
                    <td>{suscriptor.id}</td>
                    <td>{suscriptor.name}</td>
                    <td>{suscriptor.phone}</td>
                    <td>{suscriptor.address}</td>
                    <td>{suscriptor.id_suscriptor}</td></tr>);
        return (
            <Table striped>
              <thead><tr style={{background: "#343a40", color:"white"}}><th>Id</th><th>Nombre</th><th>Telefono</th><th>Direccion</th><th>Cedula</th></tr></thead>
              <tbody>
                {rows}
              </tbody>
            </Table>
      );
     }
     return (<p></p>)
    }
}