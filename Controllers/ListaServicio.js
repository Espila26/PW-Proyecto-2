class ListaServicio extends React.Component {
    constructor(props) {
      super(props)
      this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        this.props.handleReset();
        this.props.handleChangeServicio(this.props.servicios[index]);
    }
    render() {
      if (this.props.cuadras.length > 0) {
        const rows = this.props.servicios.map((servicio,index) =>
                    <tr key={index} data-item={index} onClick={this.handleDetails}>
                    <td>{servicio.id}</td>
                    <td>{servicio.id_suscriptor}</td>
                    <td>{servicio.phone}</td>
                    <td>{servicio.location}</td>
                    <td>{servicio.code}</td>
                    <td>{servicio.type}</td>
                    <td>{servicio.instalation_date}</td>
                    <td>{servicio.other_services}</td>
                    <td>{servicio.state}</td>
                    <td>{servicio.housing_type}</td>
                    <td>{servicio.floor_number}</td>
                    <td>{servicio.external_hub_number}</td>
                    <td>{servicio.cable_meters}</td>
                    <td>{servicio.instalation_belongs_to_suscriptor}</td>
                    <td>{servicio.tvs_number}</td></tr>);
        return (
            <table width="100%" border="1">
              <thead>
                  <tr>
                    <th>Id</th>
                    <th>Suscriptor</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Code</th>
                    <th>Type</th>
                    <th>Instalation Date</th>
                    <th>Other Services</th>
                    <th>State</th>
                    <th>Housing Type</th>
                    <th>Floor Number</th>
                    <th>External Hub Number</th>
                    <th>Cable Meters</th>
                    <th>Instalation</th>
                    <th>TVS Number</th>
                  </tr>
                  </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
      );
     }
     return (<p></p>)
    }
}