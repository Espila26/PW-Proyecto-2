const Table = Reactstrap.Table;
const Progress = Reactstrap.Progress;
const ColumnChart = ReactChartkick.ColumnChart;
const PieChart = ReactChartkick.PieChart;
const Alert = Reactstrap.Alert;
const Input = Reactstrap.Input;

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state={logged:false,loading:true,userName:'',password:'', 
        sucursales:[], id_sucursal:0, manager_name:'', phone:0, city:'', address:'',
        regiones: [], id_region:0, id_sucursal_reg:0, code:'', name: '', region_manager: '',
        cuadras:[], id_cuadra:0, id_region_cuadra:0, code_cuadra:'', description:'',
        reportes: [],id_reporte:0, id_suscriptor_rep:0, id_servicio_rep:0, date:'', type:'', description_rep:'',state_rep:'',
        suscriptores:[], id_suscriptor:0, name:'', phone_susc:0, address_susc:'', cedula: '', 
        servicios:[], id_servicio:0, id_suscriptor_servicio:0, location:'', code_serv:'', type_serv:'', instalation_date: '', other_services: '', state_serv:'', housing_type:'',  floor_number:0, external_hub_number:'', cable_number:'',instalation_belongs_to_suscriptor: '', tvs_number:'',
        currentPage: 'login', data:[], error:'', tipoGrafico:''};
        this.handleFields = this.handleFields.bind(this);
        this.handleChangeDataServicio = this.handleChangeDataServicio.bind(this);
        this.handleChangeDataSuscriptores = this.handleChangeDataSuscriptores.bind(this);
        this.handleReloadSucursal = this.handleReloadSucursal.bind(this);
        this.handleReloadRegion = this.handleReloadRegion.bind(this);
        this.handleReloadCuadra = this.handleReloadCuadra.bind(this); 
        this.handleReloadReporte = this.handleReloadReporte.bind(this);
        this.handleReloadServicio = this.handleReloadServicio.bind(this); 
        this.handleReloadSuscriptores = this.handleReloadSuscriptores.bind(this);
        this.handleChangeSucursal = this.handleChangeSucursal.bind(this);
        this.handleChangeRegion = this.handleChangeRegion.bind(this);
        this.handleChangeCuadra = this.handleChangeCuadra.bind(this);
        this.handleChangeSuscriptor = this.handleChangeSuscriptor.bind(this);
        this.handleChangeServicio = this.handleChangeServicio.bind(this);
        this.handleChangeReporte = this.handleChangeReporte.bind(this);
        this.changeView = this.changeView.bind(this); 
        this.login = this.login.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.createError = this.createError.bind(this);
        this.handleGraphFields = this.handleGraphFields.bind(this);
        this.setChartOtherServices = this.setChartOtherServices.bind(this);
        this.setChartData = this.setChartData.bind(this);
        this.setChartDataCuadras = this.setChartDataCuadras.bind(this);
        this.setChartDataRegiones = this.setChartDataRegiones.bind(this);
        this.setChartDataSucursal = this.setChartDataSucursal.bind(this);

    }

    handleReset()
    {
      this.setState({
        id_sucursal:0, manager_name:'', phone:0, city:'', address:'', error:'',
        id_region:0, id_sucursal_reg:0, code:'', name: '', region_manager: '',
        id_cuadra:0, id_region_cuadra:0, code_cuadra:'', description:'',
        id_reporte:0, id_suscriptor_rep:0, id_servicio_rep:0, date:'', type:'', description_rep:'',state_rep:'',
        id_suscriptor:0, name:'', phone_susc:0, address_susc:'', cedula: '', 
        id_servicio:0, id_suscriptor_servicio:0, location:'', code_serv:'', type_serv:'', instalation_date: '', other_services: '', state_serv:'', housing_type:'',  floor_number:0, external_hub_number:'', cable_number:'',instalation_belongs_to_suscriptor: '', tvs_number:''
      });
    }

    createError(error){
      this.setState({error:error});
    }

    handleFields(event) {
      const propiedad = event.currentTarget.getAttribute('name');
      this.setState({[propiedad]: event.target.value});
    }

    handleGraphFields(event){
      const propiedad = event.currentTarget.getAttribute('name');
      alert(event.target.value);
     
      switch(event.target.value){
        case 'Tipo': 
          this.setChartData();
          break;
        case 'Ubicacion':
          this.setChartDataCuadras();
          break;
        case 'Cuadras':
          this.setChartDataCuadras();
          break;
        case 'Regiones':
          this.setChartDataRegiones();
          break;
        case 'Sucursales':
          this.setChartDataSucursal();
          break;
        case 'Periodo':
          break;
        case 'Otros servicios':
          this.setChartOtherServices();
          break;
      }

      this.setState({tipoGrafico: event.target.value});

    }

    setChartData() {
      //Get service type count
      let cantReducido = 0;
      let cantBasico = 0;
      let cantPremium = 0;
      this.state.servicios.map((servicio,index) => {
        if(servicio.type === "Reducido"){
          cantReducido++;
        }else if(servicio.type === "Basico"){
          cantBasico++;
        }else if(servicio.type === "Premium"){
          cantPremium++;
        }
      });
      const types = [{name:"Reducido", cant: cantReducido},{name:"Basico",cant:cantBasico},
                     {name:"Premium", cant: cantPremium}];
      const data = types.map((type,index) => [type.name,type.cant]);
      this.setState({ data: data });
    }

    setChartOtherServices() {
      //Get otherServices count
      alert('yes');
      let cantCable = 0;
      let cantInternet = 0;
      let cantRed = 0;
      this.state.servicios.map((servicio,index) => {
        if(servicio.other_services === "Cable Digital"){
          cantCable++;
        }else if(servicio.other_services === "Internet"){
          cantInternet++;
        }else if(servicio.other_services === "Red privada de datos"){
          cantRed++;
        }
      });
      const types = [{name:"Cable Digital", cant: cantCable},{name:"Internet",cant:cantInternet},
                     {name:"Red privada de datos", cant: cantRed}];
      const data = types.map((type,index) => [type.name,type.cant]);
      this.setState({ data: data });
    }

    setChartDataCuadras(){
      let temp_cuadras = [];
      for(let i = 0; i < this.state.cuadras.length; i++){
        temp_cuadras.push({
          id: this.state.cuadras[i].id, cant:0
        });
      }

      for(let i = 0; i< this.state.servicios.length; i++){
          const index = temp_cuadras.findIndex(cuadra => cuadra.id == this.state.servicios[i].location);
          temp_cuadras[index].cant++; 
          //alert(temp_cuadras[index].cant);
      }

      const data = temp_cuadras.map((location,index) => [location.id,location.cant]);
      this.setState({ data: data });

    }

    setChartDataRegiones(){
      let temp_cuadras = [];
      let temp_region = [];

      for(let i = 0; i < this.state.cuadras.length; i++){
        temp_cuadras.push({
          id: this.state.cuadras[i].id, id_region:this.state.cuadras[i].id_region
        });
      }

      for(let i = 0; i < this.state.regiones.length; i++){
        temp_region.push({
          id: this.state.regiones[i].id, cant:0
        });
      }

      for(let i = 0; i< this.state.servicios.length; i++){
          const index = temp_cuadras.findIndex(cuadra => cuadra.id == this.state.servicios[i].location);
          const indexRegion = temp_region.findIndex(region => region.id == temp_cuadras[index].id_region);
          temp_region[indexRegion].cant++; 
          //alert(temp_region[indexRegion].cant);
      }

      const data = temp_region.map((location,index) => [location.id,location.cant]);
      this.setState({ data: data });
    }

    setChartDataSucursal(){
      let temp_cuadras = [];
      let temp_region = [];
      let temp_sucursal = [];

      for(let i = 0; i < this.state.cuadras.length; i++){
        temp_cuadras.push({
          id: this.state.cuadras[i].id, id_region:this.state.cuadras[i].id_region
        });
      }

      for(let i = 0; i < this.state.regiones.length; i++){
        temp_region.push({
          id: this.state.regiones[i].id, id_sucursal: this.state.regiones[i].id_sucursal
        });
      }

      for(let i = 0; i < this.state.sucursales.length; i++){
        temp_sucursal.push({
          id: this.state.sucursales[i].id, cant:0
        });
      }

      for(let i = 0; i< this.state.servicios.length; i++){
          const index = temp_cuadras.findIndex(cuadra => cuadra.id == this.state.servicios[i].location);
          const indexRegion = temp_region.findIndex(region => region.id == temp_cuadras[index].id_region);
          const indexSucursal = temp_sucursal.findIndex(sucursal => sucursal.id == temp_region[indexRegion].id_sucursal);
          temp_sucursal[indexSucursal].cant++; 
          //alert(temp_sucursal[indexSucursal].cant);
      }

      const data = temp_sucursal.map((location,index) => [location.id,location.cant]);
      this.setState({ data: data });
    }

    handleChangeDataServicio(){
      this.handleReloadServicio();
    }

    handleChangeDataSuscriptores(){
      this.handleReloadSuscriptores();
    }

    componentWillMount() {
      this.handleReloadSucursal();
      this.handleReloadRegion();
      this.handleReloadCuadra();
      this.handleReloadServicio();
      this.handleReloadReporte();
      this.handleReloadSuscriptores();
    }

    handleReloadSucursal(){
      this.handleReset();
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
      this.handleReset();
      fetch('datos.php/Region')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ regiones: data});
            this.forceUpdate();
        })
    }

    handleReloadCuadra(){
      this.handleReset();
      fetch('datos.php/Cuadra')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ cuadras: data});
            this.forceUpdate();
        })
    }

    handleReloadReporte(){
      this.handleReset();
      fetch('datos.php/Reporte')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ reportes: data});
            this.forceUpdate();
        })
    }

    handleReloadServicio(){
      this.handleReset();
      fetch('datos.php/Servicio')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ servicios: data});
            this.setChartData();
            this.forceUpdate();
        })
    }

    handleReloadSuscriptores(){
      this.handleReset();
      fetch('datos.php/Suscriptor')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ suscriptores: data});
            this.forceUpdate();
        })
    }

    handleChangeSucursal(sucursal){
      this.setState({id_sucursal: sucursal.id, manager_name: sucursal.manager_name, phone: sucursal.phone, city: sucursal.city, address:sucursal.address});
    }

    handleChangeRegion(region){
      this.setState({id_region: region.id, id_sucursal_reg: region.id_sucursal, code: region.code, name: region.name, region_manager:region.region_manager});
    }

    handleChangeCuadra(cuadra){
      this.setState({id_cuadra: cuadra.id, id_region_cuadra: cuadra.id_region, code_cuadra: cuadra.code, description:cuadra.description});
    }

    handleChangeServicio(servicio){
      this.setState({id_servicio: servicio.id, id_suscriptor_servicio: servicio.id_suscriptor, location: servicio.location, code_serv:servicio.code, type_serv:servicio.type, 
      instalation_date:servicio.instalation_date, other_services:servicio.other_services, state_serv: servicio.state, housing_type:servicio.housing_type,
      floor_number:servicio.floor_number, external_hub_number:servicio.external_hub_number, cable_number: servicio.cable_meters,
      instalation_belongs_to_suscriptor: servicio.instalation_belongs_to_suscriptor, tvs_number: servicio.tvs_number});
    }

    handleChangeReporte(reporte){
      this.setState({id_reporte: reporte.id, id_suscriptor_rep: reporte.id_suscriptor, id_servicio_rep: reporte.id_servicio, date:reporte.date, type: reporte.type, description_rep: reporte.description, state_rep: reporte.state});
    }

    handleChangeSuscriptor(suscriptor){
      this.setState({id_suscriptor: suscriptor.id, name: suscriptor.name, phone_susc: suscriptor.phone, address_susc:suscriptor.address, cedula: suscriptor.id_suscriptor});
    }

    changeView(view){
      this.setState({currentPage: view});
    }
    login(logged){
      this.setState({logged:logged});
    }

    render() {
        return (
          <div>
            { (this.state.loading) && <Progress animated value={100} />
              
              || (!this.state.loading) && (!this.state.logged) && (this.state.currentPage==='login') &&
              <Login handleFields={this.handleFields} userName={this.state.userName} password={this.state.password} changeView={this.changeView} login={this.login}/>

              || (!this.state.loading) && (!this.state.logged) && (this.state.currentPage==='signIn') &&
              <SignIn handleFields={this.handleFields} userName={this.state.userName} password={this.state.password} changeView={this.changeView} login={this.login}/>

              || (!this.state.loading) && (this.state.logged) && 
              <div>
                <Menu currentPage={this.state.currentPage} changeView={this.changeView}/> 
                {(this.state.error) &&  <Alert color="danger">{this.state.error}</Alert>}
                {
                ((this.state.currentPage==='regiones') &&
                  <div align="center"><h1>Regiones</h1><Table><tr width="100%">
                  <td width="50%"><FormRegion handleFields={this.handleFields} id_region={this.state.id_region} 
                  id_sucursal_reg={this.state.id_sucursal_reg} code={this.state.code} name ={this.state.name} region_manager={this.state.region_manager}  
                  regiones={this.state.regiones} sucursales={this.state.sucursales} handleReloadRegion =  {this.handleReloadRegion} createError={this.createError}/></td>
                  <td width="50%"><ListaRegion regiones={this.state.regiones} handleChangeRegion =  {this.handleChangeRegion}/></td>  
                  </tr></Table></div> 
                )

                ||((this.state.currentPage==='sucursales') &&
                <div align="center"><h1>Sucursales</h1><Table><tr width="100%">
                    <td width="50%"><FormSucursal handleFields={this.handleFields} id_sucursal={this.state.id_sucursal} 
                    manager_name={this.state.manager_name} phone={this.state.phone} city={this.state.city} address={this.state.address} 
                    sucursales={this.state.sucursales} handleReloadSucursal =  {this.handleReloadSucursal}/></td>
                <td width="50%"><ListaSucursal sucursales={this.state.sucursales} handleChangeSucursal = {this.handleChangeSucursal}/></td>
                </tr></Table></div> 
              )

              ||((this.state.currentPage==='cuadras') &&
                <div align="center"><h1>Cuadras</h1><Table><tr width="100%">
                    <td width="50%"><FormCuadra handleFields={this.handleFields} cuadras={this.state.cuadras} id_cuadra={this.state.id_cuadra} id_region_cuadra={this.state.id_region_cuadra} createError={this.createError}
                                                code_cuadra={this.state.code_cuadra} description={this.state.description} handleReloadCuadra =  {this.handleReloadCuadra} regiones={this.state.regiones}/></td>
                <td width="50%"><ListaCuadra cuadras={this.state.cuadras} handleChangeCuadra =  {this.handleChangeCuadra}/></td>
                </tr></Table></div> 
              )

              ||((this.state.currentPage==='suscriptores') &&
              <div align="center"><h1>Suscriptores</h1><Table><tr width="100%">
                  <td width="50%"><FormSuscriptores handleFields={this.handleFields} suscriptores={this.state.suscriptores} id_suscriptor={this.state.id_suscriptor} name={this.state.name} 
                                  phone_susc={this.state.phone_susc} address_susc={this.state.address_susc} cedula={this.state.cedula} handleChangeDataSuscriptores =  {this.handleChangeDataSuscriptores} regiones={this.state.regiones}/></td>
              <td width="50%"><ListaSuscriptores suscriptores={this.state.suscriptores} handleChangeSuscriptor =  {this.handleChangeSuscriptor}/></td>
              </tr></Table></div> 
            )

            ||((this.state.currentPage==='servicios') &&
            <div align="center"><h1>Servicios</h1><Table><tr width="100%">
                <td width="50%"><FormServicio handleFields={this.handleFields} suscriptores={this.state.suscriptores} servicios={this.state.servicios} id_servicio={this.state.id_servicio}
                 id_suscriptor_servicio={this.state.id_suscriptor_servicio} location={this.state.location} code_serv={this.state.code_serv} type_serv={this.state.type_serv} 
                 instalation_date={this.state.instalation_date} other_services={this.state.other_services} state_serv={this.state.state_serv} housing_type={this.state.housing_type}  
                 floor_number={this.state.floor_number} external_hub_number={this.state.external_hub_number} cable_number={this.state.cable_number} cuadras={this.state.cuadras} createError={this.createError}
                 instalation_belongs_to_suscriptor={this.state.instalation_belongs_to_suscriptor} tvs_number={this.state.tvs_number} handleChangeDataServicio =  {this.handleChangeDataServicio}/></td>
            <td width="50%"><ListaServicio servicios={this.state.servicios} handleChangeServicio =  {this.handleChangeServicio}/></td>
            </tr></Table></div> 
          )

          ||((this.state.currentPage==='reportes') &&
          <div align="center"><h1>Reportes</h1><Table><tr width="100%">
              <td width="50%"><FormReportes handleFields={this.handleFields}
              reportes={this.state.reportes} id_reporte={this.state.id_reporte} id_suscriptor_rep={this.state.id_suscriptor_rep} state_rep={this.state.state_rep}
               id_servicio_rep={this.state.id_servicio_rep} date={this.state.date} type={this.state.type} description_rep={this.state.description_rep} 
               servicios={this.state.servicios} suscriptores={this.state.suscriptores} handleReloadReporte =  {this.handleReloadReporte}/></td>
          <td width="50%"><ListaReportes reportes={this.state.reportes} handleChangeReporte =  {this.handleChangeReporte}/></td>
          </tr></Table></div> 
        )

        ||((this.state.currentPage==='grafico') &&
        <div align="center"><h1>Analisis Grafico</h1>
        <Label>Sucursal:</Label>
        <Input type="select" onChange={this.handleGraphFields} name='tipoGrafico'>
        <option key = "tipo">Tipo</option>
        <option key = "ubicacion">Ubicacion</option>
        <option key = "periodos">Periodos</option>
        <option key = "otros">Otros servicios</option>
        </Input>
        {
          (this.state.tipoGrafico == 'Ubicacion' || this.state.tipoGrafico == 'Cuadras' || this.state.tipoGrafico == 'Regiones' || this.state.tipoGrafico == 'Sucursales') && (
          <Input type="select" onChange={this.handleGraphFields} name='tipoGrafico'>
            <option key = "cuadras">Cuadras</option>
            <option key = "regiones">Regiones</option>
            <option key = "sucursales">Sucursales</option>
          </Input>
          )
        }
        <ColumnChart data={this.state.data}/>
        <PieChart data={this.state.data} onClick={this.handleClick}/>
           </div> 
        )
        }
        </div>
        }
        </div>
      )
    }
}
ReactDOM.render(<App/>, document.getElementById('root'));
