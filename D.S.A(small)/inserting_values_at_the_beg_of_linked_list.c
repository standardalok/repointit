#include<stdio.h>
#include<stdlib.h>

typedef struct Node{
    int data;
    struct Node *nxt; 
}Node;

Node *A=NULL;

void Insert(int x){
    Node *tmp=(Node *)malloc(sizeof(Node));
    tmp->data=x;
    tmp->nxt=A;
    A=tmp;
};
void Print(){
    Node *tmp=A;
    while (tmp!=NULL){
        printf("%d\n",tmp->data);
        tmp=tmp->nxt;
    }
};

int main(){
    int i,n,x;
    printf("How Many Numbers Are You Wanted To Enter;");
    scanf("%d",&n);
    for(i=0;i<n;i++){
        printf("Enter the Number ");
        scanf("%d",&x);
        Insert(x);
    }
    Print();
    return 0;
}
