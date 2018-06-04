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
            <table width="100%" border="1">
              <thead><tr><th>Id</th><th>Name</th><th>Phone</th><th>Address</th><th>Id-Suscriptor</th></tr></thead>
              <tbody>
                {rows}
              </tbody>
            </table>
      );
     }
     return (<p></p>)
    }
}