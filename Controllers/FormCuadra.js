const Button = Reactstrap.Button;
const Table = Reactstrap.Table;
const FormGroup = Reactstrap.FormGroup;
const Label = Reactstrap.Label;
const Input = Reactstrap.Input;
const FormText = Reactstrap.FormText;

class FormCuadra extends React.Component {
    constructor(props) {
       super(props)
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      
    }
    componentWillReceiveProps(nextProps) {
        //n
    }

    handleInsert() {
        if(!this.props.id_region_cuadra){
            this.props.createError('Debe de ingresar una region!');
            return;
        }
        fetch("datos.php/Cuadra/"+this.props.id_cuadra,{
            method: "put",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'put',
                id_region: this.props.id_region_cuadra,
                code: this.props.code_cuadra,
                description: this.props.description})
    }).then((response) => {
           this.props.handleReloadCuadra();
         }
    );
    }
    
    handleUpdate() {
        if(!this.props.id_region_cuadra){
            this.props.createError('Debe de ingresar una region!');
            return;
        }
        fetch("datos.php/Cuadra/"+this.props.id_cuadra,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.id_cuadra, 
                id_region: this.props.id_region_cuadra,
                code: this.props.code_cuadra,
                description: this.props.description})
     }).then((response) => {
           this.props.handleReloadCuadra();
         }
    );
    }

    handleDelete() {
        fetch("datos.php/Cuadra/"+this.props.id_cuadra,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
           this.props.handleReloadCuadra();
         }
    );
    }

    render() {
        let regiones = this.props.regiones;
        let optionItems = regiones.map((region) => <option key = {region.id}>{region.id}</option>);
        return(<form><Table><tbody>
           <tr><td width="30%"><Label>Region:</Label></td>
               <td width="20%">
               <Input type="select" onChange={this.props.handleFields} name='id_region_cuadra' value={this.props.id_region_cuadra}>
                        <option></option>
                        {optionItems}
                </Input>
               </td></tr>
           <tr><td><Label>Codigo:</Label></td>
               <td><Input type="number" name="code_cuadra"
                   value={this.props.code_cuadra} onChange={this.props.handleFields}/></td></tr>
           <tr><td><Label>Descripcion:</Label></td>
               <td><Input type="text" name="description"
                   value={this.props.description} onChange={this.props.handleFields}/></td></tr>
           </tbody></Table><input type="hidden" name="id" value={this.props.id_cuadra}/>
           <Table><tbody><tr>
               <td><Button onClick={this.handleInsert}>Agregar</Button></td>
               <td><Button onClick={this.handleUpdate}>Modificar</Button></td>
               <td><Button onClick={this.handleDelete}>Eliminar</Button></td>
           </tr></tbody></Table></form>)
    }
}