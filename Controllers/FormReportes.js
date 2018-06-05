const Button = Reactstrap.Button;
const Table = Reactstrap.Table;
const FormGroup = Reactstrap.FormGroup;
const Label = Reactstrap.Label;
const Input = Reactstrap.Input;
const FormText = Reactstrap.FormText;

class FormReportes extends React.Component {
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
        fetch("datos.php/Reporte/"+this.props.id_reporte,{
            method: "put",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'put',
                id_suscriptor: this.props.id_suscriptor_rep,
                id_servicio: this.props.id_servicio_rep,
                date: this.props.date,
                type: this.props.type,
                description: this.props.description,
                state:this.props.state})
    }).then((response) => {
           this.props.handleChangeDataReporte();
         }
    );
    }
    
    handleUpdate() {
        fetch("datos.php/Reporte/"+this.props.id_reporte,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.id_reporte, 
                id_suscriptor: this.props.id_suscriptor_rep,
                id_servicio: this.props.id_servicio_rep,
                date: this.props.date,
                type: this.props.type,
                description: this.props.description,
                state:this.props.state})
     }).then((response) => {
           this.props.handleChangeDataReporte();
         }
    );
    }

    handleDelete() {
        fetch("datos.php/Reporte/"+this.props.id_reporte,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
           this.props.handleChangeDataReporte();
         }
    );
    }

    render() {
        let suscriptores = this.props.suscriptores;
        let optionItems = suscriptores.map((suscriptor) => <option key = {suscriptor.id}>{suscriptor.id}</option>);
        let servicios = this.props.servicios;
        let optionItems2 = servicios.map((servicio) => <option key = {servicio.id}>{servicio.id}</option>);
        return(<form><Table><tbody>
           <tr><td width="30%"><Label>Suscriptor:</Label></td>
               <td width="20%">
               <select onChange={this.props.handleFields} name='id_suscriptor_rep'>
                        {optionItems}
                    </select>
                </td></tr>
            <tr><td width="30%"><Label>Servicio:</Label></td>
               <td width="20%">
               <select onChange={this.props.handleFields} name='id_servicio_rep'>
                        {optionItems}
                    </select>
                </td></tr>
           <tr><td><Label>Date:</Label></td>
               <td><Input type="text" name="date"
                   value={this.props.date} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>Type:</Label></td>
               <td><Input type="text" name="type"
                   value={this.props.type} onChange={this.props.handleFields}/></td></tr>
           <tr><td><Label>Description:</Label></td>
               <td><Input type="text" name="description"
                   value={this.props.description} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>State:</Label></td>
               <td><Input type="text" name="state"
                   value={this.props.state} onChange={this.props.handleFields}/></td></tr>
           </tbody></Table><input type="hidden" name="id" value={this.props.id_reporte}/>
           <Table><tbody><tr>
               <td><Button onClick={this.handleInsert}>Agregar</Button></td>
               <td><Button onClick={this.handleUpdate}>Modificar</Button></td>
               <td><Button onClick={this.handleDelete}>Eliminar</Button></td>
           </tr></tbody></Table></form>)
    }
}