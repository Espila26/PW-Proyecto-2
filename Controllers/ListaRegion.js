class ListaRegion extends React.Component {
    constructor(props) {
      super(props)
      this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        //this.props.handleReset();
        this.props.handleChangeRegion(this.props.regiones[index]);
    }
    render() {
      if (this.props.regiones.length > 0) {
        const rows = this.props.regiones.map((region,index) =>
                    <tr key={index} data-item={index} onClick={this.handleDetails}>
                    <td>{region.id}</td>
                    <td>{region.id_sucursal}</td>
                    <td>{region.code}</td>
                    <td>{region.name}</td>
                    <td>{region.region_manager}</td></tr>);
        return (
            <table width="100%" border="1">
              <thead><tr><th>Id</th><th>Sucursal</th><th>Code</th><th>Name</th><th>Region Manager</th></tr></thead>
              <tbody>
                {rows}
              </tbody>
            </table>
      );
     }
     return (<p></p>)
    }
}