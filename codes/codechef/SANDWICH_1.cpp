#include <iostream>
#include <string.h>
using namespace std;
int dp[100][100];

int ncr(int n, int r, int m) {
	if (n < r)return 0;
	if (r == 0 || r == n)return 1;
	int &res = dp[n][r]; if (~res)return res;
	res = ncr(n - 1, r, m) + ncr(n - 1, r - 1, m);
	if (res >= m)res -= m;
	return res;
}

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	int t; cin >> t; while (t--) {
		memset(dp, -1, sizeof dp);
		int n, k; int m; cin >> n >> k >> m;
		int a = (n + k - 1) / k;
		int ex = a * k - n;
		cout << a << ' ' << ncr(ex + a - 1, a - 1, m) << '\n';
	}
}