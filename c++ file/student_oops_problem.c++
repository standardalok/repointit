#include<iostream>

using namespace std;

class Student{
    private:
        string name;
        int roll_no;
        double maths_marks;
        double physics_marks;
        double chemistry_marks;
    public:
        Student(string name,int roll_no,double maths_marks,double physics_marks,double chemistry_marks){
            this->name=name;
            this->roll_no=roll_no;
            this->maths_marks=maths_marks;
            this->physics_marks=physics_marks;
            this->chemistry_marks=chemistry_marks;
        }
        void per_calc(){
            double w=(((maths_marks+physics_marks+chemistry_marks)/90)*100);
            cout<<"The Percentage Of"<<name<<"is"<<w;
        };

        void student_data(){
            cout<<"The Name Of Student is:"<<name<<endl;
            cout<<"The Roll_No Of Student is:"<<roll_no<<endl;
            cout<<"The Maths Marks Of Student is:"<<maths_marks<<endl;
            cout<<"The Physics Marks Of Student is:"<<physics_marks<<endl;
            cout<<"The Chemistry Marks Of Student is:"<<chemistry_marks<<endl;
        }
};


int main(){
    Student s1("Alok",4,25,26,27),
    s2("Naman",8,29,28,23),
    s3("Aman",11,24,26,21),
    s4("Ujjawal",15,28,20,19),
    s5("Aditya",13,18,13,25);

    s1.student_data();
    s1.per_calc();

    return 0;
}