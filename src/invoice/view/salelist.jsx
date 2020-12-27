import React, { useState, useEffect } from 'react'
import invCtrl from '../controller/invoice.controller'
import Mui from 'mui-datatables'
import { checkSquareO } from 'react-icons-kit/fa/checkSquareO'
import { trashO } from 'react-icons-kit/fa/trashO'
import Icon from 'react-icons-kit'
import { close } from 'react-icons-kit/fa/close'
import ErrorAlert from '../../ErrorAlert'
import SuccessAlert from '../../SuccessAlert'
import Swal from 'sweetalert2'
import { pencil } from 'react-icons-kit/fa/pencil';
import itemController from '../../item/controllers/item.controller';
import collaboration from '../../collaboration/collaboration';
import 'selectize/dist/js/standalone/selectize.js'
import 'selectize/dist/css/selectize.bootstrap3.css'
import $ from 'jquery'
import docCtrl from '../../docs/controllers/docs.controller'
import { list } from 'react-icons-kit/icomoon/list';
const SaleList = () => {

    const [salesList, setSaleList] = useState([]);

    useEffect(async () => {
        let result = await invCtrl.getInvoices();
        if (result) {
            let invoices = result.filter(r => r.docType.description === "FATURE BLERJE");
            setSaleList(invoices);
        }
    }, [])

    const updateModal = (id) => {

    }

    const getBodies = (id) => {

    }

    const deleteInvoice = async (id) => {

    }

    if (salesList.length > 0) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <Mui
                            title="Sale's List"
                            data={
                                salesList.map(i => {
                                    let array = [
                                        <button onClick={updateModal(i.invertoryID)} data-toggle="modal" data-target="#myModal" className="btn btn-secondary"><Icon icon={pencil} /></button>,
                                        i.docNo, i.docType.description, i.pos.name, i.supplier.name, i.docDate.toString().split('T')[0], i.description,
                                        <button onClick={getBodies(i.invertoryID)} className="btn btn-secondary"><Icon icon={list} /></button>,
                                        <button onClick={deleteInvoice(i.invertoryID)} className="btn btn-danger"><Icon icon={trashO} /></button>
                                    ]
                                    console.log(array)
                                    return array;
                                })
                            }
                            columns={["Update", "Invoice Number", "Invoice Type", "Store", "Supplier", "Date", "Description", "Items", "Delete"]}
                        />
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div>

            </div>
        )
    }
}

export default SaleList
