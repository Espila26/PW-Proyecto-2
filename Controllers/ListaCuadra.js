class ListaCuadra extends React.Component {
    constructor(props) {
      super(props)
      this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        this.props.handleReset();
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
            <table width="100%" border="1">
              <thead><tr><th>Id</th><th>Region</th><th>Code</th><th>Description</th></tr></thead>
              <tbody>
                {rows}
              </tbody>
            </table>
      );
     }
     return (<p></p>)
    }
}