#include<bits/stdc++.h>
using namespace std;

string s;
int dp[52][30];
int f(int i, int l) {
	if (l >= 26)return 0;
	if (i >= s.size())return 26 - l;
	int &res = dp[i][l]; if (~res)return res; res = 1000000;
	int k = s[i] - 'a' + 1;
	if (k == l + 1)res = min(res, f(i + 1, k));
	res = min(res, f(i + 1, l));
	res = min(res, f(i, l + 1) + 1);
	return res;
}

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	memset(dp, -1, sizeof dp);

	cin >> s;
	cout << f(0, 0) << '\n';
	return 0;
}