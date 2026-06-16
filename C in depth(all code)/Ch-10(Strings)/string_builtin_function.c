#include<stdio.h>
#include<string.h>
int main()
{
    int i ;
    int a;
    char str[]="alok";
    char str2[10];
    char str3[10];
    char str4[10];

    printf("Enter The first string \n");
    scanf("%s",str2);
    
    puts("Enter The second string \n");
    gets(str3);

    printf("Enter The first string \n");
    scanf("%s",str4);


    a=strlen(str);
    for(i=0;i<a;i++)
    {
        printf("%c",str[i]);
        printf("\n");
    }
    printf("The length of the given string \"%s\" is %d ",str,a);

    return 0;
}