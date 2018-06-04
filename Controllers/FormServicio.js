const Button = Reactstrap.Button;
const Table = Reactstrap.Table;
const FormGroup = Reactstrap.FormGroup;
const Label = Reactstrap.Label;
const Input = Reactstrap.Input;
const FormText = Reactstrap.FormText;

class FormServicio extends React.Component {
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
        fetch("datos.php/Servicio/"+this.props.id_servicio,{
            method: "put",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'put',
                id_suscriptor: this.props.id_suscriptor,
                location: this.props.location,
                code: this.props.code_serv,
                type: this.props.type_serv,
                instalation_date: this.props.instalation_date,
                other_services: this.props.other_services,
                state: this.props.state_serv,
                housing_type: this.props.housing_type,
                floor_number: this.props.floor_number,
                external_hub_number: this.props.external_hub_number,
                cable_number: this.props.cable_number,
                instalation_belongs_to_suscriptor: this.props.instalation_belongs_to_suscriptor,
                tvs_number: this.props.tvs_number})
    }).then((response) => {
           this.props.handleChangeData();
         }
    );
    }
    
    handleUpdate() {
        fetch("datos.php/Servicio/"+this.props.id_servicio,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.id_servicio, 
                id_suscriptor: this.props.id_suscriptor_servicio,
                location: this.props.location,
                code: this.props.code_serv,
                type: this.props.type_serv,
                instalation_date: this.props.instalation_date,
                other_services: this.props.other_services,
                state: this.props.state_serv,
                housing_type: this.props.housing_type,
                floor_number: this.props.floor_number,
                external_hub_number: this.props.external_hub_number,
                cable_number: this.props.cable_number,
                instalation_belongs_to_suscriptor: this.props.instalation_belongs_to_suscriptor,
                tvs_number: this.props.tvs_number})
     }).then((response) => {
           this.props.handleChangeData();
         }
    );
    }

    handleDelete() {
        fetch("datos.php/Servicio/"+this.props.id_servicio,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
           this.props.handleChangeData();
         }
    );
    }

    render() {
        let suscriptores = this.props.suscriptores;
        let optionItems = suscriptores.map((suscriptor) => <option key = {suscriptor.id}>{suscriptor.id}</option>);
        return(<form><Table><tbody>
           <tr><td width="30%"><Label>Suscriptor:</Label></td>
               <td width="20%">
               <select onChange={this.props.handleFields} name='id_suscriptor_servicio'>
                        {optionItems}
                </select>
               </td></tr>
           <tr><td><Label>Location:</Label></td>
               <td><Input type="text" name="location"
                   value={this.props.location} onChange={this.props.handleFields}/></td></tr>
           <tr><td><Label>Code:</Label></td>
               <td><Input type="number" name="code_serv"
                   value={this.props.code_serv} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>Type:</Label></td>
               <td><Input type="text" name="type_serv"
                   value={this.props.type_serv} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>Instalation Date:</Label></td>
               <td><Input type="text" name="instalation_date"
                   value={this.props.instalation_date} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>Other Description:</Label></td>
               <td><Input type="text" name="other_services"
                   value={this.props.other_services} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>State:</Label></td>
               <td><Input type="text" name="state_serv"
                   value={this.props.state_serv} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>Housing Type:</Label></td>
               <td><Input type="text" name="housing_type"
                   value={this.props.housing_type} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>Floor Number:</Label></td>
               <td><Input type="number" name="floor_number"
                   value={this.props.floor_number} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>External Hub Number:</Label></td>
               <td><Input type="number" name="external_hub_number"
                   value={this.props.external_hub_number} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>Cable Number:</Label></td>
               <td><Input type="number" name="cable_number"
                   value={this.props.cable_number} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>Instalation Belongs To Suscriptor:</Label></td>
               <td><Input type="number" name="external_hub_number"
                   value={this.props.instalation_belongs_to_suscriptor} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>TVS Number:</Label></td>
               <td><Input type="number" name="tvs_number"
                   value={this.props.tvs_number} onChange={this.props.handleFields}/></td></tr>
           </tbody></Table><input type="hidden" name="id" value={this.props.id_servicio}/>
           <Table><tbody><tr>
               <td><Button onClick={this.handleInsert}>Agregar</Button></td>
               <td><Button onClick={this.handleUpdate}>Modificar</Button></td>
               <td><Button onClick={this.handleDelete}>Eliminar</Button></td>
           </tr></tbody></Table></form>)
    }
}