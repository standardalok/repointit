#define r1 2
#define c1 3
#define r2 c1
#define c2 4

#include<stdio.h>
int main(){
    int i,j;
    int arr1[r1][c1],arr2[r2][c2],arr3[r1][c2];
    printf("enter the first matrix rowwise \n");
    for(i=0;i<r1;i++)
    {
       for(j=0;j<c1;j++)
           scanf("%d",&arr1[i][j]);
    }
    for(i=0;i<r1;i++)
       {
        for(j=0;j<c1;j++)
           printf("%d ",arr1[i][j]);
        printf("\n");
       }
    
    
    return 0;
        
}