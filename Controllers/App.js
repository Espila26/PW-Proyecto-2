const Table = Reactstrap.Table;
const Progress = Reactstrap.Progress;

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state={logged:false,loading:true,userName:'',password:'', 
        sucursales:[], id_sucursal:0, manager_name:'', phone:0, city:'', address:'',
        regiones: [], id_region:0, id_sucursal_reg:0, code:'', name: '', region_manager: '',
        cuadras:[], id_cuadra:0, id_region_cuadra:0, code_cuadra:'', description:''};
        this.handleFields = this.handleFields.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleReloadSucursal = this.handleReloadSucursal.bind(this);
        this.handleReloadRegion = this.handleReloadRegion.bind(this);
        this.handleReloadCuadra = this.handleReloadCuadra.bind(this); 
        this.handleChangeSucursal = this.handleChangeSucursal.bind(this);
        this.handleChangeRegion = this.handleChangeRegion.bind(this);
        this.handleChangeCuadra = this.handleChangeCuadra.bind(this);    
    }

    handleFields(event) {
      const propiedad = event.currentTarget.getAttribute('name');
      this.setState({[propiedad]: event.target.value});
    }

    handleChangeData() {
      this.handleChangeSucursal();
      this.handleChangeRegion();
      this.handleChangeCuadra();
    }

    componentWillMount() {
      this.handleReloadSucursal();
      this.handleReloadRegion();
      this.handleReloadCuadra();
    }

    handleReloadSucursal(){
      fetch('datos.php/Sucursal')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ sucursales: data, loading:false });
            this.forceUpdate();
        })
    }
    
    handleReloadRegion(){
      fetch('datos.php/Region')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ regiones: data, loading:false });
            this.forceUpdate();
        })
    }

    handleReloadCuadra(){
      fetch('datos.php/Cuadras')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ cuadras: data, loading:false });
            this.forceUpdate();
        })
    }

    handleChangeSucursal(sucursal){
      this.setState({id_sucursal: sucursal.id, manager_name: sucursal.manager_name, phone: sucursal.phone, city: sucursal.city, address:sucursal.address});
    }

    handleChangeRegion(region){
      this.setState({id_region: region.id, id_sucursal_reg: region.id_sucursal, code: region.code, region_manager:region.region_manager});
    }

    handleChangeCuadra(cuadra){
      this.setState({id_cuadra: cuadra.id, id_region_cuadra: cuadra.id_region, code: region.code_cuadra, description:cuadra.description});
    }

    render() {
        return (
          <div>
            {//<Login handleFields={this.handleFields} userName={this.state.userName} password={this.state.password}/>
              //<SignIn handleFields={this.handleFields} userName={this.state.userName} password={this.state.password}/>
            }
            {(this.state.loading) && <Progress animated value={100} />}
            {(!this.state.loading) &&
            <div> 
            <Menu/>
            <Table>
              <tr width="100%">
                <td width="50%"><FormSucursal handleFields={this.handleFields} id_sucursal={this.state.id_sucursal} 
                manager_name={this.state.manager_name} phone={this.state.phone} city={this.state.city} address={this.state.address} 
                sucursales={this.state.sucursales} handleChangeData =  {this.handleChangeData}/></td>
                <td width="50%"><ListaSucursal sucursales={this.state.sucursales} handleChangeData =  {this.handleChangeData} handleChangeSucursal = {this.handleChangeSucursal}/></td>
              </tr>
            </Table>
            </div> 
          }
          </div>
      )
    }
}
ReactDOM.render(<App/>, document.getElementById('root'));
