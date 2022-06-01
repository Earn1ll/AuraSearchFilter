@IsTest
public with sharing class ContactControllerAuraTest {

    @testSetup static void setup() {
        List<Contact> testContacts = new List<Contact>();
        for(Integer i = 0; i < 2; i++) {
            Contact contacts = new Contact(
                FirstName = 'FirstName' + i,
                LastName = 'LastName' + i
            );
            testContacts.add(contacts);
        }
        insert testContacts;
    }

    @isTest 
    static void getContacts_returnContacts_contactsWasReceived() {
        List<Contact> newContacts = [ SELECT Id, LastName, FirstName, CreatedDate FROM Contact ];

        Test.startTest();
        List<Contact> returnedContacts = ContactControllerAura.fetchContacts();
        Test.stopTest();
        
        System.assertEquals(newContacts, returnedContacts, 'Contacts were not received');
    }

    @isTest 
    static void getContacts_returnContacts_contactsNotLoaded() {
        List<Contact> newContacts = [
            SELECT Id, LastName, FirstName, CreatedDate FROM Contact
            WHERE FirstName = 'FirstNameContact'
        ]
        ;
        Test.startTest();
        Integer returnedContacts = ContactControllerAura.fetchContacts().size();
        Test.stopTest();
        
        System.assertNotEquals(newContacts.size(), returnedContacts, 'Contacts are loaded');
    }

    @isTest static void getContacts_findByName() {
        List<Contact> testContacts = new List<Contact>();

        test.startTest();
        testContacts = ContactControllerAura.findByName('First');
        Test.stopTest();

        System.assertEquals(2, testContacts.size(), 'receipted incorrect count of contacts');
    }

    @isTest static void getContacts_findByName_emptySearch() {
        List<Contact> testContacts = new List<Contact>();

        test.startTest();
        testContacts = ContactControllerAura.findByName('');
        Test.stopTest();

        System.assertEquals(2, testContacts.size(), 'filter works incorrectly');
    }
}
