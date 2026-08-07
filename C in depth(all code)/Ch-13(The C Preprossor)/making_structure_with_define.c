#include<stdio.h>
#define MAKE_STRUC(datatype1,datatype2,name1,name2,t,varname)\
struct t{ datatype1 name1; datatype2 name2; }varname;

int main()
{
    MAKE_STRUC(int,int,rollno,age,st1,st1);    
    st1.rollno=2;
    printf("%d",st1.rollno);
    return 0;

}