const Table = Reactstrap.Table;

class ListaCuadra extends React.Component {
    constructor(props) {
      super(props)
      this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        //this.props.handleReset();
        this.props.handleChangeCuadra(this.props.cuadras[index]);
    }
    render() {
      if (this.props.cuadras.length > 0) {
        const rows = this.props.cuadras.map((cuadra,index) =>
                    <tr key={index} data-item={index} onClick={this.handleDetails}>
                    <td>{cuadra.id}</td>
                    <td>{cuadra.id_region}</td>
                    <td>{cuadra.code}</td>
                    <td>{cuadra.description}</td></tr>);
        return (
            <Table striped>
              <thead><tr style={{background: "#343a40", color:"white"}}><th>Id</th><th>Region</th><th>Codigo</th><th>Descripcion</th></tr></thead>
              <tbody>
                {rows}
              </tbody>
            </Table>
      );
     }
     return (<p></p>)
    }
}