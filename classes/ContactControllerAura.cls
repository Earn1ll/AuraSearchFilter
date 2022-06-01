public with sharing class ContactControllerAura {
    @AuraEnabled
    public static List<Contact> fetchContacts() {              
        return [
            SELECT FirstName, LastName, Email, Account.Name, MobilePhone, CreatedDate, AccountId
            FROM Contact
            ORDER BY CreatedDate DESC 
            LIMIT 20            
        ];
    }

    @AuraEnabled
    public static List<Contact> findByName(String searchKey) {
        String name = '%' + searchKey + '%';
        return [
            SELECT FirstName, LastName, Email, Account.Name, MobilePhone, CreatedDate, AccountId
            FROM Contact
            WHERE FirstName LIKE :name
            ORDER BY CreatedDate DESC 
            LIMIT 20
        ];            
    }
}