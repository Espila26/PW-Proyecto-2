const Table = Reactstrap.Table;

class ListaReportes extends React.Component {
    constructor(props) {
      super(props)
      this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        this.props.handleReset();
        this.props.handleChangeReportes(this.props.reportes[index]);
    }
    render() {
      if (this.props.cuadras.length > 0) {
        const rows = this.props.reportes.map((reporte,index) =>
                    <tr key={index} data-item={index} onClick={this.handleDetails}>
                    <td>{reporte.id}</td>
                    <td>{reporte.id_suscriptor}</td>
                    <td>{reporte.id_servicio}</td>
                    <td>{reporte.date}</td>
                    <td>{reporte.type}</td>
                    <td>{reporte.description}</td>
                    <td>{reporte.state}</td></tr>);
        return (
            <Table striped>
              <thead><tr style={{background: "#60c7c1", color:"white"}}><th>Id</th><th>Suscriptor</th><th>Servicio</th><th>Date</th><th>Type</th><th>Decription</th><th>Estados</th></tr></thead>
              <tbody>
                {rows}
              </tbody>
            </Table>
      );
     }
     return (<p></p>)
    }
}