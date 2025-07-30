#include <bits/stdc++.h>
using namespace std;
#define ll long long


ll dp[3][502][502];
ll f(int i, int r, int l) {
	if (r <= 0)return i > 1;
	ll &ret = dp[i][r][l]; if (~ret)return ret; ret = 0;
	for (int j = 1; j <= r && j < l; j++)
		ret += f(min(i + 1, 2), r - j, j);
	return ret;
}

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	memset(dp, -1, sizeof dp);
	int n; cin >> n;
	cout << f(0, n, n) << '\n';
}