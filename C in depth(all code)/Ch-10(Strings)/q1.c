#include <stdio.h>
int main(){
    int i,count=0;
    int arr[] = {1,0,0,0, 5,6,7,8,0,10};
    int n= sizeof(arr)/sizeof(arr[0]);
    printf("%d\n",n);
    for(i=0;i<n;i++)
       if(arr[i]!=0)
       {
        count++;
       }
       else
       {
        continue;
       }
    printf("%d",count);
    return 0;

}