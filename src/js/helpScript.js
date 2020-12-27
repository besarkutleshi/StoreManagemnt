import $ from 'jquery'
class helpScript{
    _appendDataTable = (tableName) => {

        // $(`#${tableName}`).DataTable().destroy();
        // $(`#${tableName}`).DataTable().clear();
        if (!$.fn.dataTable.isDataTable(`#${tableName}`)) {

            $(`#${tableName}`).DataTable({
                searching: false,
                bLengthChange: false,
                bPaginate: false,
                bInfo: false,
            });
            
        }

    }
}

export default new helpScript();