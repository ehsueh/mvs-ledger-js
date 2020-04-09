## Example 1: ETP Transfer
- Processed through Magnum Wallet
- Tranfser 0.1234 ETP from MNWVbJuNxq9FQNL1bWXx5sXiFRKjcFuuj9 to MT7By3irp1nzTvha3zGe7t8h61HtUSzTAn
- https://explorer.mvs.org/tx/9439d3f3d897b9e4bb9519bc9452d7877f49388cfb27e3a82c2a70033a5b7c47

1. 
Trasaction state: 0x00 (Init transaction parser),
Version: 04000000, number of inputs: 02
``` 
New APDU received:  
E042000009000000010400000002
Init transaction parser
Add to hash full
04000000
Add to hash full
02
Number of inputs : 2
Process input
```

2. 
Transaction state: 0x01 (ready to process input),
Transaction hash pointer: 69,
Length of script to read: 105

```
New APDU received:
E042800025D276995306FEA2DDE27A7627897405E130C6E077DB0D1E0B2387E4D92C6A50B80000000069
Process input
Add to hash full
D276995306FEA2DDE27A7627897405E130C6E077DB0D1E0B2387E4D92C6A50B800000000
Add to hash full
69
Script to read 105
Process input script, remaining 105
```
3. 
```
New APDU received:
E04280003246304302200A78A698BF743EDA0F5B7479D87D2ACD651AA1FE179A32E9F2051FF0240AA4A8021F67B02B4685475E24F8378A
Process input script, remaining 105
Add to hash full
46304302200A78A698BF743EDA0F5B7479D87D2ACD651AA1FE179A32E9F2051FF0240AA4A8021F67B02B4685475E24F8378A
Process input script, remaining 55
```
4. 
```
New APDU received:
E0428000325BA61A8A37D0D6343E5B55DA9EAEEBB33EC43DD8012103B8A7892F5B333881A261465938EA4170B3387AADEDC8DB0B5489EB
Process input script, remaining 55
Add to hash full
5BA61A8A37D0D6343E5B55DA9EAEEBB33EC43DD8012103B8A7892F5B333881A261465938EA4170B3387AADEDC8DB0B5489EB
Process input script, remaining 5
```
5. 
```
New APDU received:
E042800009A930D512BDFFFFFFFF
Process input script, remaining 5
Add to hash full
A930D512
Process input script, remaining 1
Disabling P2SH consumption
Add to hash full
BD
Add to hash full
FFFFFFFF
Process input
```
6. 
```
New APDU received:
E042800025D6341F1C76CEA7C6C196E0252BC5AA90BA401CC62F0D681F604E23F7CF0C133F010000006B
Process input
Add to hash full
D6341F1C76CEA7C6C196E0252BC5AA90BA401CC62F0D681F604E23F7CF0C133F01000000
Add to hash full
6B
Script to read 107
Process input script, remaining 107
```
7. 
```
New APDU received:
E042800032483045022100AA60BE01CE73A024ED2237D577D31A2BA4B4B0AAD2121AE44ABDEC74D604FFF1022013DC233FBCA6E3B5C7B0
Process input script, remaining 107
Add to hash full
483045022100AA60BE01CE73A024ED2237D577D31A2BA4B4B0AAD2121AE44ABDEC74D604FFF1022013DC233FBCA6E3B5C7B0
Process input script, remaining 57
```
8. 
```
New APDU received:
E042800032D4BA86733F01820794948CF50C2E317C6CFC51E8D784012103B8A7892F5B333881A261465938EA4170B3387AADEDC8DB0B54
Process input script, remaining 57
Add to hash full
D4BA86733F01820794948CF50C2E317C6CFC51E8D784012103B8A7892F5B333881A261465938EA4170B3387AADEDC8DB0B54
Process input script, remaining 7
```
9. 
```
New APDU received:
E04280000B89EBA930D512BDFFFFFFFF
Process input script, remaining 7
Add to hash full
89EBA930D512
Process input script, remaining 1
Disabling P2SH consumption
Add to hash full
BD
Add to hash full
FFFFFFFF
Process input
Input hashing done
```
10.  
```
New APDU received:
E04280000102
Input hashing done
Add to hash full
02
Number of outputs : 2
```
11. 
```
New APDU received:
E04280006700000000000000001976A914D2B0D45DFDBA50FBD227F968C79A29ECE05144FB88ACCF0000000600000004616C6C3103616C6C020F4D57546573744D495453796D626F6C224D5437427933697270316E7A54766861337A4765377438683631487455537A54416E
Add to hash full
0000000000000000
Add to hash full
19
Script to read 94
Process output script, remaining 94
Add to hash full
76A914D2B0D45DFDBA50FBD227F968C79A29ECE05144FB88ACCF0000000600000004616C6C3103616C6C020F4D57546573744D495453796D626F6C224D5437427933697270316E7A54766861337A4765377438683631487455537A54416E
Process output script, remaining 0
```
12. 
```
New APDU received:
E04280002A60B3D60B000000001976A914A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC88AC0100000000000000
Process output script, remaining 0
Add to hash full
60B3D60B00000000
Add to hash full
19
Script to read 33
Process output script, remaining 33
Add to hash full
76A914A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC88AC0100000000000000
Process output script, remaining 0
```
13. 
```
New APDU received:
E04280000400000000
Process output script, remaining 0
Output hashing done
Add to hash full
00000000
Transaction parsed
```
14. 
```
New APDU received:
E040000015058000002C800008FE800000000000000000000000
pin ok
Using private component
C7E3509E7D0C887C7363B7E5E2A0947E4B8C2A92023D9CD54E0182B044CA2F74
To hash
03B8A7892F5B333881A261465938EA4170B3387AADEDC8DB0B5489EBA930D512BD
Hash160
A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC
Checksum
10CEAC3C
Length to encode 25
To encode
32A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC10CEAC3C
Length encoded 34
Encoded
4D4E5756624A754E78713946514E4C31625758783573586946524B6A634675756A39
Length 34
```
15. 
```
New APDU received:
E0440000050400000001
Init transaction parser
Add to hash full
04000000
Add to hash full
01
Number of inputs : 1
Process input
```
16. 
```
New APDU received:
E04480003B01383200E5CFC8C6F49AE03D2C260364B941ACA1355BB584957728FD04A7625F9C16D0ACEA4F0100000060B3D60B000000001187B94F00DC80A119
Process input
Trusted input hash
C8C6F49AE03D2C260364B941ACA1355BB584957728FD04A7625F9C16D0ACEA4F01000000
Add to hash full
C8C6F49AE03D2C260364B941ACA1355BB584957728FD04A7625F9C16D0ACEA4F01000000
Adding amount
60B3D60B00000000
New amount
000000000BD6B360
Add to hash full
19
Script to read 25
Process input script, remaining 25
```
17. 
```
New APDU received:
E04480001D76A914A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC88ACFFFFFFFF
Process input script, remaining 25
Add to hash full
76A914A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC88
Process input script, remaining 1
Disabling P2SH consumption
Add to hash full
AC
Add to hash full
FFFFFFFF
Process input
Input hashing done
Presign ready
```
18. 
```
New APDU received:
E04AFF0015058000002C800008FE800000000000000000000000
state=1
Using private component
C7E3509E7D0C887C7363B7E5E2A0947E4B8C2A92023D9CD54E0182B044CA2F74
```
19. 
```
New APDU received:
E04AFF0E020000
state=1
```
20. 
```
New APDU received:
E04A00002B02204BBC00000000001976A914D2B0D45DFDBA50FBD227F968C79A29ECE05144FB88AC0100000000000000
state=1
Checksum
9F84A9F7
Length to encode 25
To encode
32D2B0D45DFDBA50FBD227F968C79A29ECE05144FB9F84A9F7
Length encoded 34
Encoded
4D5437427933697270316E7A54766861337A4765377438683631487455537A54416E
ETP_VERSION 1
ETP_BUFF Type = 00000000
ATTACHMENT.TYPE.ETP_TRANSFER
ETP_OUT_TYPE 0

```
21. After clicking "Confirm"
```
New APDU received:
E04A80002A30411A0B000000001976A914A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC88AC0100000000000000
state=2
```
22. After clicking "Accept and Send"
```
New APDU received:
E04800001B058000002C800008FE800000000000000000000000000000000001
Using private component
C7E3509E7D0C887C7363B7E5E2A0947E4B8C2A92023D9CD54E0182B044CA2F74
Finalize hash with
0000000001000000
Hash1
6FF7C09F944F2075BD2032B96E5568093013435A957ABECBF7BBE5610BFEFBDD
Hash2
F363AB374D7D8C5F8423D8E588B690AA06D5F3C519F9DF00F7AC5E8F32BC0DFF
```