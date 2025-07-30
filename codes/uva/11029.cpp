#include <bits/stdc++.h>
using namespace std;

#define ll long long
#define ld long double
#define endl '\n'

string tostring(int a){
	string s=to_string(a);
	while(s.size()<3)s="0"+s;
	return s;
}
int Pow(int a,int b){
	a%=1000; int r=1; while(b){
		if(b&1)r=r*a%1000;
		a=a*a%1000;
		b>>=1;
	}return r;
}

int32_t main(){
	ios_base::sync_with_stdio(0); cin.tie(0);

	int t; cin>>t; while(t--){
		int n,m; cin>>n>>m;
		string l=tostring(Pow(n,m));
		ld lg=(ld)m*log10((ld)n);
		lg -= floor(lg) - 2;
		lg = pow((ld)10,lg);
		cout<<floor(lg+1e-9)<<"..."<<l<<endl;
	}
}