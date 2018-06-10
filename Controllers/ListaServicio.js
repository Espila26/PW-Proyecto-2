const Table = Reactstrap.Table;

class ListaServicio extends React.Component {
    constructor(props) {
      super(props)
      this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        //this.props.handleReset();
        this.props.handleChangeServicio(this.props.servicios[index]);
    }
    render() {
      if (this.props.servicios.length > 0) {
        const rows = this.props.servicios.map((servicio,index) =>
                    <tr key={index} data-item={index} onClick={this.handleDetails}>
                    <td>{servicio.id}</td>
                    <td>{servicio.id_suscriptor}</td>
                    <td>{servicio.location}</td>
                    <td>{servicio.code}</td>
                    <td>{servicio.type}</td>
                    <td>{servicio.instalation_date}</td>
                    <td>{servicio.other_services}</td>
                    <td>{servicio.state}</td>
                    <td>{servicio.instalation_belongs_to_suscriptor}</td>
                    <td>{servicio.tvs_number}</td></tr>);
        return (
            <Table>
              <thead>
                  <tr style={{background: "#343a40", color:"white"}}>
                    <th>Id</th>
                    <th>Suscriptor</th>
                    <th>Direccion</th>
                    <th>Codigo</th>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Otro Servicio</th>
                    <th>Estado</th>
                    <th>Instalation</th>
                    <th>Numero de TVS</th>
                  </tr>
                  </thead>
              <tbody>
                {rows}
              </tbody>
            </Table>
      );
     }
     return (<p></p>)
    }
}