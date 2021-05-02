#include <bits/stdc++.h>
using namespace std;

#define ll long long
#define lll __int128
const ll base = 1e18;
// sum from 1 to n
lll sum(ll n) {
	return ((lll)n * (n + 1) / 2);
}
// sum from l to r
lll sum(ll l, ll r) {
	return (sum(r) - sum(l - 1));
}
// sum of sum of divisor of all number from 1 to n
lll ssod(ll n) {
	lll s = 0;
	for (ll i = 1, la; i <= n; i = la + 1) {
		la = n / (n / i);
		s = (s + sum(i, la) * (n / i));
	} return s;
}

lll query(ll n) {
	lll x = ssod(n);
	if (n > 0) {
		x = (x - sum(1, n));
	} return x;
}
string tostring(lll n){
	string s;
	while(n)s+=n%10+'0',n/=10;
	if(s=="")s+="0";
	reverse(s.begin(), s.end());
	return s;
}
int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	int t; cin >> t; while (t--) {
		ll n; cin >> n;
		lll a = query(n);
		cout<<tostring(a)<<'\n';
	}
}