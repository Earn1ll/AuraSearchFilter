({
    fetchContactHelper : function(component, event, helper) {
        component.set('v.mycolumns', [
                { label: 'First Name', fieldName: 'FirstName', type: 'text' },
                { label: 'Last Name', fieldName: 'LastName', type: 'text' },
                { label: 'Email', fieldName: 'Email', type: 'email' },                
                { label: 'Account', fieldName: 'LinkAcc', type: 'url', typeAttributes: { 
                    label: { fieldName: 'AccountName' }}
                },                
                { label: 'Mobile Phone', fieldName: 'MobilePhone', type: 'Phone'},
                { label: 'Created Date', fieldName: 'CreatedDate', type: 'date', typeAttributes: {
                    month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }   
                }
            ]);
        let action = component.get('c.fetchContacts');        
        action.setParams({
        });
        action.setCallback(this, function(response){            
            let state = response.getState();
            if (state === 'SUCCESS') {                
                let dataContacts = response.getReturnValue();
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
            }
        });
        $A.enqueueAction(action);
    }
})