#include<stdio.h>
int main()
{
    int i,j,temp;
    int arr[10];
    printf("enter the number:");
    for(i=0;i<10;i++)
    {
        scanf("%d",&arr[i]);
    }
    for(i=0;i<9;i++)
    {
        for(j=0;j<10-1-i;j++)
        {
            if(arr[j]>arr[j+1])
            {
                temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
    for(i=0;i<10;i++)
    {
        printf("%dc",arr[i]);  
    printf("\n");
    }
    return 0;
}