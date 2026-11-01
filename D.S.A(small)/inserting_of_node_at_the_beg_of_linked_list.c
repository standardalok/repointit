#include<stdio.h>
#include<stdlib.h>

typedef struct Node{
    int a;
    struct Node *nxt;
}Node;

Node *c;

void beg_insert(int o){
    Node *tmp1=(Node *)malloc(sizeof(Node));
    tmp1->a=o;
    tmp1->nxt=NULL;
    if(c!=NULL){
        tmp1->nxt=c;
    }
    c=tmp1;
}

void Print(){
    Node *tmp2=c;
    while(tmp2==NULL){
        printf("%d");
        tmp2=tmp2->nxt;
    }
    printf("\n");
}











int main(){
    Node *tmp=(Node *)malloc(sizeof(Node));
    c=NULL;
    int i,x,n;
    printf("How Many Numbers You Wanted To Insert");
    scanf("%d",&n);
    for (i=0;i<=n;i++){
        printf("Enter The Number");
        scanf("%d",&x);
        beg_insert(x);
        Print();
    }







    return 0;
};