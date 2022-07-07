-- Create Tables

CREATE TABLE national_pregnancy
(id SERIAL,
state VARCHAR,
year INT,
pregnancyratelt15 VARCHAR,
pregnancyrate1517 VARCHAR,
pregnancyrate1819 VARCHAR,
pregnancyrate1519 VARCHAR,
pregnancyratelt20 VARCHAR,
pregnancyrate2024 VARCHAR,
pregnancyrate2529 VARCHAR,
pregnancyrate3034 VARCHAR,
pregnancyrate3539 VARCHAR,
pregnancyrate40plus VARCHAR,
abortionratelt15 VARCHAR,
abortionrate1517 VARCHAR,
abortionrate1819 VARCHAR,
abortionrate1519 VARCHAR,
abortionratelt20 VARCHAR,
abortionrate2024 VARCHAR,
abortionrate2529 VARCHAR,
abortionrate3034 VARCHAR,
abortionrate3539 VARCHAR,
abortionrate40plus VARCHAR,
birthratelt15 VARCHAR,
birthrate1517 VARCHAR,
birthrate1819 VARCHAR,
birthrate1519 VARCHAR,
birthratelt20 VARCHAR,
birthrate2024 VARCHAR,
birthrate2529 VARCHAR,
birthrate3034 VARCHAR,
birthrate3539 VARCHAR,
birthrate40plus VARCHAR,
abortionratiolt15 VARCHAR,
abortionratio1517 VARCHAR,
abortionratio1819 VARCHAR,
abortionratio1519 VARCHAR,
abortionratiolt20 VARCHAR,
abortionratio2024 VARCHAR,
abortionratio2529 VARCHAR,
abortionratio3034 VARCHAR,
abortionratio3539 VARCHAR,
abortionratio40plus VARCHAR,
pregnancieslt15 VARCHAR,
pregnancies1517 VARCHAR,
pregnancies1819 VARCHAR,
pregnancies1519 VARCHAR,
pregnancieslt20 VARCHAR,
pregnancies2024 VARCHAR, 
pregnancies2529 VARCHAR,
pregnancies3034 VARCHAR,
pregnancies3539 VARCHAR,
pregnancies40plus VARCHAR,
abortionslt15 VARCHAR,
abortions1517 VARCHAR,
abortions1819 VARCHAR,
abortions1519 VARCHAR,
abortionslt20 VARCHAR,
abortions2024 VARCHAR,
abortions2529 VARCHAR,
abortions3034 VARCHAR,
abortions3539 VARCHAR,
abortions40plus VARCHAR,
birthslt15 VARCHAR, 
births1517 VARCHAR,
births1819 VARCHAR,
births1519 VARCHAR,
birthslt20 VARCHAR,
births2024 VARCHAR,
births2529 VARCHAR, 
births3034 VARCHAR,
births3539 VARCHAR,
births40plus VARCHAR,
miscarriageslt15 VARCHAR,
miscarriages1517 VARCHAR,
miscarriages1819 VARCHAR,
miscarriages1519 VARCHAR,
miscarriageslt20 VARCHAR,
miscarriages2024 VARCHAR,
miscarriages2529 VARCHAR,
miscarriages3034 VARCHAR,
miscarriages3539 VARCHAR,
miscarriages40plus VARCHAR,
populationlt15 VARCHAR,
population1517 VARCHAR,
population1819 VARCHAR,
population1519 VARCHAR,
populationlt20 VARCHAR,
population2024 VARCHAR,
population2529 VARCHAR,
population3034 VARCHAR,
population3539 VARCHAR,
population40plus VARCHAR,
population1544 VARCHAR,
abortionstotal VARCHAR,
birthstotal VARCHAR,
pregnancyratetotal VARCHAR,
birthratetotal VARCHAR,
abortionratetotal VARCHAR,
abortionratiototal VARCHAR,
miscarriagestotal VARCHAR,
pregnanciestotal VARCHAR,
notes VARCHAR,
versiondate VARCHAR
);

CREATE TABLE abortion_info
( id SERIAL,
State VARCHAR,
abortionRate VARCHAR,
totalAbortions VARCHAR,
totalBirths VARCHAR,
abortionClinics VARCHAR,
abortionRatio VARCHAR
);

-- Input CSVs Provided into Tables

-- national_pregnancy = NationalAndStatePregnancy_PublicUse.csv
-- abortion_info = csvData.csv

-- Drop Unused Columns From national_pregnancy Table

ALTER TABLE national_pregnancy
DROP COLUMN pregnancyrate2529,  
DROP COLUMN pregnancyrate3034,  
DROP COLUMN pregnancyrate3539,  
DROP COLUMN pregnancyrate40plus,  
DROP COLUMN abortionrate2529,  
DROP COLUMN abortionrate3034,  
DROP COLUMN abortionrate3539,  
DROP COLUMN abortionrate40plus,  
DROP COLUMN birthratelt15,  
DROP COLUMN birthrate1517,  
DROP COLUMN birthrate1819,  
DROP COLUMN birthrate1519,  
DROP COLUMN birthratelt20,  
DROP COLUMN birthrate2024,
DROP COLUMN birthrate2529,
DROP COLUMN birthrate3034,
DROP COLUMN birthrate3539,  
DROP COLUMN birthrate40plus,
DROP COLUMN abortionratiolt15,  
DROP COLUMN abortionratio1517,  
DROP COLUMN abortionratio1819,  
DROP COLUMN abortionratio1519,  
DROP COLUMN abortionratiolt20,  
DROP COLUMN abortionratio2024,   
DROP COLUMN abortionratio2529,  
DROP COLUMN abortionratio3034,
DROP COLUMN abortionratio3539,
DROP COLUMN abortionratio40plus,
DROP COLUMN pregnancies2529,
DROP COLUMN pregnancies3034,
DROP COLUMN pregnancies3539,
DROP COLUMN pregnancies40plus,
DROP COLUMN abortions2529,
DROP COLUMN abortions3034,
DROP COLUMN abortions3539,
DROP COLUMN abortions40plus,
DROP COLUMN birthslt15,
DROP COLUMN births1517,
DROP COLUMN births1819,
DROP COLUMN births1519,
DROP COLUMN birthslt20,
DROP COLUMN births2024,
DROP COLUMN births2529,
DROP COLUMN births3034,
DROP COLUMN births3539,
DROP COLUMN births40plus,
DROP COLUMN miscarriageslt15,
DROP COLUMN miscarriages1517,
DROP COLUMN miscarriages1819,
DROP COLUMN miscarriages1519,
DROP COLUMN miscarriageslt20,
DROP COLUMN miscarriages2024,
DROP COLUMN miscarriages2529,
DROP COLUMN miscarriages3034,
DROP COLUMN miscarriages3539,
DROP COLUMN miscarriages40plus,
DROP COLUMN population2529,
DROP COLUMN population3034,
DROP COLUMN population3539,
DROP COLUMN population40plus,
DROP COLUMN population1544,
DROP COLUMN birthstotal,
DROP COLUMN birthratetotal,
DROP COLUMN miscarriagestotal,
DROP COLUMN versiondate
;

-- Update State Names In abortion_info Table To Match State Abbreviations In national_pregnancy Table

UPDATE abortion_info
SET state = 'WY'
Where id = '1';

UPDATE abortion_info
SET state = 'SD'
Where id = '2';

UPDATE abortion_info
SET state = 'KY'
Where id = '3';

UPDATE abortion_info
SET state = 'ID'
Where id = '4';

UPDATE abortion_info
SET state = 'MO'
Where id = '5';

UPDATE abortion_info
SET state = 'MS'
Where id = '6';

UPDATE abortion_info
SET state = 'WV'
Where id = '7';

UPDATE abortion_info
SET state = 'UT'
Where id = '8';

UPDATE abortion_info
SET state = 'SC'
Where id = '9';

UPDATE abortion_info
SET state = 'NE'
Where id = '10';

UPDATE abortion_info
SET state = 'AR'
Where id = '11';

UPDATE abortion_info
SET state = 'WI'
Where id = '12';

UPDATE abortion_info
SET state = 'IN'
Where id = '13';

UPDATE abortion_info
SET state = 'OK'
Where id = '14';

UPDATE abortion_info
SET state = 'IA'
Where id = '15';

UPDATE abortion_info
SET state = 'AL'
Where id = '16';

UPDATE abortion_info
SET state = 'ND'
Where id = '17';

UPDATE abortion_info
SET state = 'MT'
Where id = '18';

UPDATE abortion_info
SET state = 'AK'
Where id = '19';

UPDATE abortion_info
SET state = 'ME'
Where id = '20';

UPDATE abortion_info
SET state = 'TN'
Where id = '21';

UPDATE abortion_info
SET state = 'NH'
Where id = '22';

UPDATE abortion_info
SET state = 'AZ'
Where id = '23';

UPDATE abortion_info
SET state = 'TX'
Where id = '24';

UPDATE abortion_info
SET state = 'OH'
Where id = '25';

UPDATE abortion_info
SET state = 'MN'
Where id = '26';

UPDATE abortion_info
SET state = 'VA'
Where id = '27';

UPDATE abortion_info
SET state = 'DE'
Where id = '28';

UPDATE abortion_info
SET state = 'LA'
Where id = '29';

UPDATE abortion_info
SET state = 'CO'
Where id = '30';

UPDATE abortion_info
SET state = 'VT'
Where id = '31';

UPDATE abortion_info
SET state = 'NM'
Where id = '32';

UPDATE abortion_info
SET state = 'OR'
Where id = '33';

UPDATE abortion_info
SET state = 'HI'
Where id = '34';

UPDATE abortion_info
SET state = 'WA'
Where id = '35';

UPDATE abortion_info
SET state = 'KS'
Where id = '36';

UPDATE abortion_info
SET state = 'PA'
Where id = '37';

UPDATE abortion_info
SET state = 'MA'
Where id = '38';

UPDATE abortion_info
SET state = 'MI'
Where id = '39';

UPDATE abortion_info
SET state = 'NC'
Where id = '40';

UPDATE abortion_info
SET state = 'NV'
Where id = '41';

UPDATE abortion_info
SET state = 'CA'
Where id = '42';

UPDATE abortion_info
SET state = 'IL'
Where id = '43';

UPDATE abortion_info
SET state = 'RI'
Where id = '44';

UPDATE abortion_info
SET state = 'GA'
Where id = '45';

UPDATE abortion_info
SET state = 'CT'
Where id = '46';

UPDATE abortion_info
SET state = 'FL'
Where id = '47';

UPDATE abortion_info
SET state = 'MD'
Where id = '48';

UPDATE abortion_info
SET state = 'NY'
Where id = '49';

UPDATE abortion_info
SET state = 'NJ'
Where id = '50';

-- Insert New Column On Whether The State Will Ban Abortions Onto The abortion_info Table

ALTER TABLE abortion_info
ADD banned VARCHAR;

-- Insert Information Into Newly Created Banned Column

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '1';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '2';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '3';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '4';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '5';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '6';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '7';

UPDATE abortion_info
SET banned = 'Yes'
Where id = '8';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions (6 Weeks)'
Where id = '9';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability (22 Weeks)'
Where id = '10';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '11';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '12';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability (22 Weeks)'
Where id = '13';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '14';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability (22 Weeks)'
Where id = '15';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '16';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '17';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '18';

UPDATE abortion_info
SET banned = 'No'
Where id = '19';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '20';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '21';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability (22 Weeks)'
Where id = '22';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions'
Where id = '23';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions (6 Weeks)'
Where id = '24';

UPDATE abortion_info
SET banned = 'Yes, With Limited Exceptions (6 Weeks)'
Where id = '25';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '26';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability (3rd Trimester)'
Where id = '27';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '28';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability (22 Weeks)'
Where id = '29';

UPDATE abortion_info
SET banned = 'No'
Where id = '30';

UPDATE abortion_info
SET banned = 'No'
Where id = '31';

UPDATE abortion_info
SET banned = 'No'
Where id = '32';

UPDATE abortion_info
SET banned = 'No'
Where id = '33';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '34';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '35';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability (22 Weeks)'
Where id = '36';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability (24 Weeks)'
Where id = '37';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability (24 Weeks)'
Where id = '38';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '39';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '40';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability (24 Weeks)'
Where id = '41';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '42';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '43';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '44';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability (22 Weeks)'
Where id = '45';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '46';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability (24 Weeks)'
Where id = '47';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '48';

UPDATE abortion_info
SET banned = 'No, Until Fetal Viability'
Where id = '49';

UPDATE abortion_info
SET banned = 'No'
Where id = '50';


-- Queries Run

-- To Get Any Information From Each State Based On Year:

SELECT * 
FROM national_pregnancy
WHERE year = 'year';

-- (Years Available: 1988, 1992, 1996, 2000, 2005-2017)
-- To Target Specific Columns, Swap Out The * For Specific Columns

-- To Get Any Information From 2017 (The Latest Year)

SELECT *
FROM national_pregnancy, abortion_info
WHERE national_pregnancy.year = '2017' 
AND national_pregnancy.state = abortion_info.state;

-- To Target Specific Columns, Swap Out The * For Specific Columns