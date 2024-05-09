How to run Icarus 1.0 


DATABASE 


Install Docker and Docker Desktop, Your PC should support Docker and Virtualization. Please read the pre-requisites from docker docs
https://docs.docker.com/desktop/install/windows-install/
https://docs.docker.com/desktop/install/mac-install/

Run the MySQL Server
---------------------

Navigate to the docker folder in the project and run the command "docker-compose up --build"

C:\Users\varad\Masters\NYU Tandon\spring_2024\intro_to_java\JavaFullstackEcommerce\docker>docker-compose up --build

Go to Docker Desktop and verify whether you have two containers running, one for MySQL and one for Redis. 



BACKEND
-------

Install all the pre-requisites like Apache Maven 3.9.6 (mvn), Java SDK (Java Version 21)

After installing mvn, go to the root directory and run mvn clean install to clean and build the project, also to install any pending dependencies.

C:\Users\varad\Masters\NYU Tandon\spring_2024\intro_to_java\JavaFullstackEcommerce\ mvn clean install

Run the Backend Server
-----------------------

now run the application, IcarusApplication.java

verify if the backend server is running in the console.


FRONTEND
----------


To run an Angular application, you typically follow these steps:
-----------------------------------------------------------------

1. Installing npm on Windows
--------------------------

 (How to install Node.js : https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

Download Node.js: Go to the Node.js official website, and download the Windows installer (.msi file).
Run the installer: Double-click the downloaded .msi file to launch the installer.

Follow installation steps: Follow the installation steps provided by the installer. Make sure to check the box that says "Automatically install the necessary tools for development" to ensure npm is installed along with Node.js.

Verify installation: Once the installation is complete, open Command Prompt or PowerShell and type the following command to verify that Node.js and npm are installed:


node -v
npm -v


2. Installing npm on macOS:
-----------------------------

Using Homebrew (if you have Homebrew installed):

brew install node


Using official installer:

1. Go to the Node.js official website.
2. Download the macOS installer (.pkg file).
3. Double-click the downloaded .pkg file to run the installer.
4. Follow the installation steps.
5. Verify installation: Once the installation is complete, open Terminal and type the following command to verify that Node.js and npm are installed:

node -v
npm -v


Install Angular CLI
----------------------------

Now that you have installed npm, we need to install ng. ng is the angular cli. 



You can install Angular CLI globally on your system using npm by running the following command in your terminal or command prompt:


npm install -g @angular/cli


Note : There are other ways to install angular cli, please refer to the documentation https://angular.io/cli


Run the Frontend Server
-------------------

Now that you have both ng and npm ready, i.e (Node and Angular CLI), navigate to the "client" directory in the project

C:\Users\varad\Masters\NYU Tandon\spring_2024\intro_to_java\JavaFullstackEcommerce\client>

run the "ng serve" command

JavaFullstackEcommerce\client> ng serve


This will launch the frontend at Port 4200



Go to localhost:4200 and verify if the website is running. 

We have created a video, for this process, please check it for reference. 





NOTE : ALL THREE SERVERS MUST BE RUNNING TOGETHER IN ORDER TO RUN THE WEBSITE.



THANK YOU

Sai Nishanth Mettu sm11326
Adittya Mittal am14079
Varad Naik vvn7114
Raunak Shukla rs8809








