({
    fetchContact : function(component, event, helper) {
        helper.fetchContactHelper(component, event, helper);
    },

    searchContact : function(component, event) {
        let searchKey = component.find('searchKey').get('v.value');        
        let action = component.get('c.findByName');
        action.setParams({ 'searchKey': searchKey });
        action.setCallback(this, function(responseSearch) {
            let state = responseSearch.getState();
            if (state === 'SUCCESS') {                
                let dataContacts = responseSearch.getReturnValue();
                let datatable = [];
                dataContacts.forEach( row => { 
                    let rowData = {};
                    rowData.LastName = row.LastName;
                    rowData.FirstName = row.FirstName;
                    rowData.Email = row.Email;
                    rowData.MobilePhone = row.MobilePhone;
                    rowData.CreatedDate = row.CreatedDate;
                    if(row.AccountId) {
                    rowData.LinkAcc =  '/' + row.AccountId;
                    rowData.AccountName = row.Account.Name;
                    }
                    datatable.push(rowData);
                });
            component.set('v.contactList', datatable);
        }});
        $A.enqueueAction(action);
    }
})