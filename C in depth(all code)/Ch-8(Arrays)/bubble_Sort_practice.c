#include<stdio.h>
int main()
{
    int i ,j,temp;
    int arr[100];
    for(i=0;i<10;i++)
    {
        printf("enter the number %d:",i+1);
        scanf("%d",&arr[i]);
    }
    for(i=0;i<9;i++)
    {for(j=0;j<10-1-i;j++)
    {
        if(arr[j]>arr[j+1])
        {
            temp=arr[j];
            arr[j]=arr[j+1];
            arr[j+1]=temp;
        }
    }
}
printf("the sorted array is:");
printf("\t");
    for(i=0;i<10;i++)
    {
        printf("%d",arr[i]);
        printf("\t");
    }
    return 0;
}