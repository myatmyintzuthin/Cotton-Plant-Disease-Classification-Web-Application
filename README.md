# Cotton Plant Disease Classification Web Application :herb:
This repository is about an end to end implemetation of deep learning cotton plant disease classification web application using flask. 

# Dataset
The dataset is downloaded from [Kaggle](https://www.kaggle.com/janmejaybhoi/cotton-disease-dataset).  
Here are the sample images of the dataset...  

<img src="https://github.com/myatmyintzuthin/Cotton-Plant-Disease-Classification-Web-Application/blob/main/assets/SampleImagesfromDataset.png" width=50% height=50%>

# Model
Pretrained DenseNet121 model on ImageNet dataset is used. With the help of transfer learning, I've fine-tuned only the last 8 layers of the model to solve the problem. The model is trained for 20 epoches and the accuracy is 97% on test data. 

<img src="https://i.imgur.com/O8ntGzS.png">





